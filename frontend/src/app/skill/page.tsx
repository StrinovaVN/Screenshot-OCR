'use client';

import { useState, useEffect, useCallback } from 'react';
import { uploadImageForOCR, checkOCRHealth, type OCRResult } from '@/lib/ocr';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Image from 'next/image';
import { FileJson, FileSpreadsheet, Camera, Upload, Loader2, CheckCircle2, XCircle, RotateCcw, BarChart3, TriangleAlert, Image as ImageIcon } from 'lucide-react';

interface SkillRow {
  team: string;
  playerName: string;
  mvp: boolean;
  svp: boolean;
  score: string;
  skill: string;
  skillAssist: string;
  skillHit: string;
  healing: string;
}

export default function SkillPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<OCRResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [dragActive, setDragActive] = useState(false);
  const [skillData, setSkillData] = useState<SkillRow[]>([]);
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; field: keyof SkillRow } | null>(null);
  const [showMVP, setShowMVP] = useState(false);

  // Parse OCR result to skill data
  const parseOCRToSkillData = (ocrText: string): SkillRow[] => {
    const lines = ocrText.split('\n').filter(line => line.trim());
    const rows: SkillRow[] = [];
    
    // Skip first line (header: "Player Name Score Skill Skill Assist Skill Hit Healing")
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      const parts = line.split(/\s+/);
      
      // Need at least: PlayerName, Score, Skill
      if (parts.length >= 3) {
        // Find player name and check for MVP/SVP
        const playerName = parts[0];
        let scoreIndex = 1;
        let isMVP = false;
        let isSVP = false;
        
        // Check if second part is MVP/SVP
        if (parts[1] === 'MVP') {
          isMVP = true;
          scoreIndex = 2;
        } else if (parts[1] === 'SVP') {
          isSVP = true;
          scoreIndex = 2;
        }
        
        const score = parts[scoreIndex] || '0';
        // "e" is OCR error - it's actually the Skill data
        const skill = parts[scoreIndex + 1] || '0';
        const skillAssist = parts[scoreIndex + 2] || '0';
        const skillHit = parts[scoreIndex + 3] || '0';
        const healing = parts[scoreIndex + 4] || '0';
        
        // Assign team based on row count (first 5 rows = Team A, last 5 = Team B)
        rows.push({
          team: rows.length < 5 ? 'A' : 'B',
          playerName,
          mvp: isMVP,
          svp: isSVP,
          score,
          skill,
          skillAssist,
          skillHit,
          healing
        });
      }
    }
    
    return rows;
  };

  // Export functions
  const exportToJSON = () => {
    const dataStr = JSON.stringify(skillData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `skill-stats-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Exported to JSON!');
  };

  const exportToCSV = () => {
    const headers = showMVP 
      ? ['Team', 'PlayerName', 'MVP', 'SVP', 'Score', 'Skill', 'Skill Assist', 'Skill Hit', 'Healing']
      : ['Team', 'PlayerName', 'Score', 'Skill', 'Skill Assist', 'Skill Hit', 'Healing'];
    
    const csvRows = [
      headers.join(','),
      ...skillData.map(row => {
        const baseData = [row.team, row.playerName];
        if (showMVP) {
          baseData.push(row.mvp ? '✔' : '', row.svp ? '✔' : '');
        }
        baseData.push(row.score, row.skill, row.skillAssist, row.skillHit, row.healing);
        return baseData.join(',');
      })
    ];
    const csvStr = csvRows.join('\n');
    const dataBlob = new Blob([csvStr], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `skill-stats-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Exported to CSV!');
  };

  // Update cell value
  const updateCellValue = (rowIndex: number, field: keyof SkillRow, value: string) => {
    setSkillData(prev => {
      const newData = [...prev];
      const currentTeam = newData[rowIndex].team;
      
      if (field === 'mvp') {
        if (value === 'true') {
          // Check if this player already has SVP
          if (newData[rowIndex].svp) {
            toast.error('A player cannot have both MVP and SVP!');
            return prev;
          }
          
          // Check if same team already has SVP
          const teamHasSVP = newData.some((row, idx) => 
            idx !== rowIndex && row.team === currentTeam && row.svp
          );
          
          if (teamHasSVP) {
            toast.error('Same team cannot have both MVP and SVP!');
            return prev;
          }
          
          // Unset all other MVPs
          newData.forEach((row, idx) => {
            if (idx !== rowIndex) {
              row.mvp = false;
            }
          });
        }
        newData[rowIndex] = { ...newData[rowIndex], mvp: value === 'true' };
      } else if (field === 'svp') {
        if (value === 'true') {
          // Check if this player already has MVP
          if (newData[rowIndex].mvp) {
            toast.error('A player cannot have both MVP and SVP!');
            return prev;
          }
          
          // Check if same team already has MVP
          const teamHasMVP = newData.some((row, idx) => 
            idx !== rowIndex && row.team === currentTeam && row.mvp
          );
          
          if (teamHasMVP) {
            toast.error('Same team cannot have both MVP and SVP!');
            return prev;
          }
          
          // Unset all other SVPs
          newData.forEach((row, idx) => {
            if (idx !== rowIndex) {
              row.svp = false;
            }
          });
        }
        newData[rowIndex] = { ...newData[rowIndex], svp: value === 'true' };
      } else {
        newData[rowIndex] = { ...newData[rowIndex], [field]: value };
      }
      
      return newData;
    });
  };

  // Check server health on mount
  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      await checkOCRHealth();
      setServerStatus('online');
    } catch (error) {
      setServerStatus('offline');
      console.error('Server health check failed:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    // Validate file type
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);

    // Clear previous result
    setResult(null);
    setSkillData([]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select an image first');
      return;
    }

    if (serverStatus === 'offline') {
      toast.error('OCR server is offline. Please start the backend server.');
      return;
    }

    setLoading(true);
    try {
      const data = await uploadImageForOCR(file, 'eng');
      setResult(data);
      
      // Parse OCR text to skill data
      const parsedData = parseOCRToSkillData(data.data.text);
      setSkillData(parsedData);
      
      toast.success('OCR completed successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setSkillData([]);
  };

  // Drag and drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }, []);

  // Paste from clipboard handler
  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          handleFileSelect(blob);
          toast.success('Image pasted from clipboard!');
        }
        break;
      }
    }
  }, []);

  // Add paste event listener
  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 font-sans transition-colors">
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          Skill Statistics Scanner
        </h1>
        <p className="text-muted-foreground leading-7">
          Upload a skill screenshot to extract and analyze player statistics
        </p>
        
        {/* Server Status */}
        <div className="mt-4 flex items-center gap-2">
          {serverStatus === 'checking' && (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Checking server status...</span>
            </>
          )}
          {serverStatus === 'online' && (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm text-green-600 dark:text-green-400">OCR Server is online</span>
            </>
          )}
          {serverStatus === 'offline' && (
            <>
              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-sm text-red-600 dark:text-red-400">OCR Server is offline</span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Upload & Settings */}
        <div className="space-y-6">
          {/* Drag & Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
              transition-all duration-200
              ${dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' : 'border-gray-300 hover:border-gray-400'}
            `}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <Camera className="h-16 w-16 text-muted-foreground" />
              <div>
                <p className="text-lg font-semibold">
                  {file ? file.name : 'Click to select or drag & drop an image'}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Supports: JPG, PNG, WEBP, BMP, GIF, TIFF (Max 10MB)
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  You can also paste image from clipboard (Ctrl+V)
                </p>
              </div>
            </div>
            <Input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleUpload}
              disabled={!file || loading || serverStatus === 'offline'}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload & Extract Text
                </>
              )}
            </Button>
            
            {file && (
              <Button
                onClick={handleReset}
                variant="outline"
                disabled={loading}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            )}
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Preview:</h3>
              <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </div>
              {file && (
                <p className="text-sm text-gray-600">
                  Size: {(file.size / 1024).toFixed(2)} KB | Type: {file.type}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {result ? (
            <>
              {/* Statistics */}
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4" />
                  <h3 className="text-sm font-semibold">Scan Information</h3>
                </div>
                <div className="space-y-1 text-sm">
                  <p><strong>File:</strong> {result.file.originalName}</p>
                  <p><strong>Processed:</strong> {new Date(result.data.timestamp).toLocaleString()}</p>
                </div>
              </div>

              {/* Raw OCR Text (Collapsible) */}
              <details className="border rounded-lg p-4">
                <summary className="cursor-pointer font-semibold text-sm">
                  View Raw OCR Text
                </summary>
                <div className="mt-2 bg-gray-50 dark:bg-gray-950/50 border rounded p-3 max-h-40 overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-mono text-xs">
                    {result.data.text || '(No text detected)'}
                  </pre>
                </div>
              </details>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-950/50 border-2 border-dashed rounded-lg">
              <div className="text-center text-muted-foreground">
                <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Upload an image to see results here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data Table Section */}
      {skillData.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight">
              Skill Statistics Table
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3 items-center w-full sm:w-auto">
              {/* MVP/SVP Toggle */}
              <label className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={showMVP}
                  onChange={(e) => setShowMVP(e.target.checked)}
                  className="w-4 h-4 cursor-pointer rounded"
                />
                Show MVP/SVP
              </label>
              
              {/* Export Buttons */}
              <Button onClick={exportToJSON} variant="outline" size="sm" className="text-xs sm:text-sm">
                <FileJson className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Export </span>JSON
              </Button>
              <Button onClick={exportToCSV} variant="outline" size="sm" className="text-xs sm:text-sm">
                <FileSpreadsheet className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Export </span>CSV
              </Button>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="p-3 text-left font-semibold border-r">Team</th>
                    <th className="p-3 text-left font-semibold border-r">Player Name</th>
                    {showMVP && (
                      <>
                        <th className="p-3 text-center font-semibold border-r">MVP</th>
                        <th className="p-3 text-center font-semibold border-r">SVP</th>
                      </>
                    )}
                    <th className="p-3 text-right font-semibold border-r">Score</th>
                    <th className="p-3 text-right font-semibold border-r">Skill</th>
                    <th className="p-3 text-right font-semibold border-r">Skill Assist</th>
                    <th className="p-3 text-right font-semibold border-r">Skill Hit</th>
                    <th className="p-3 text-right font-semibold">Healing</th>
                  </tr>
                </thead>
                <tbody>
                  {skillData.map((row, rowIndex) => (
                    <tr 
                      key={rowIndex} 
                      className={`border-t hover:bg-gray-50 dark:hover:bg-gray-950/50 ${
                        row.team === 'A' ? 'bg-blue-50/30 dark:bg-blue-950/10' : 'bg-red-50/30 dark:bg-red-950/10'
                      }`}
                    >
                      <td className="p-2 border-r">
                        <input
                          type="text"
                          value={row.team}
                          onChange={(e) => updateCellValue(rowIndex, 'team', e.target.value)}
                          onFocus={() => setEditingCell({ rowIndex, field: 'team' })}
                          onBlur={() => setEditingCell(null)}
                          className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none rounded text-center font-bold"
                        />
                      </td>
                      <td className="p-2 border-r">
                        <input
                          type="text"
                          value={row.playerName}
                          onChange={(e) => updateCellValue(rowIndex, 'playerName', e.target.value)}
                          onFocus={() => setEditingCell({ rowIndex, field: 'playerName' })}
                          onBlur={() => setEditingCell(null)}
                          className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none rounded font-medium"
                        />
                      </td>
                      {showMVP && (
                        <>
                          <td className="p-2 border-r text-center">
                            <input
                              type="checkbox"
                              checked={row.mvp}
                              onChange={(e) => updateCellValue(rowIndex, 'mvp', e.target.checked ? 'true' : 'false')}
                              className="w-4 h-4 cursor-pointer"
                            />
                          </td>
                          <td className="p-2 border-r text-center">
                            <input
                              type="checkbox"
                              checked={row.svp}
                              onChange={(e) => updateCellValue(rowIndex, 'svp', e.target.checked ? 'true' : 'false')}
                              className="w-4 h-4 cursor-pointer"
                            />
                          </td>
                        </>
                      )}
                      <td className="p-2 border-r text-right">
                        <input
                          type="text"
                          value={row.score}
                          onChange={(e) => updateCellValue(rowIndex, 'score', e.target.value)}
                          onFocus={() => setEditingCell({ rowIndex, field: 'score' })}
                          onBlur={() => setEditingCell(null)}
                          className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none rounded text-right"
                        />
                      </td>
                      <td className="p-2 border-r text-right">
                        <input
                          type="text"
                          value={row.skill}
                          onChange={(e) => updateCellValue(rowIndex, 'skill', e.target.value)}
                          onFocus={() => setEditingCell({ rowIndex, field: 'skill' })}
                          onBlur={() => setEditingCell(null)}
                          className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none rounded text-right"
                        />
                      </td>
                      <td className="p-2 border-r text-right">
                        <input
                          type="text"
                          value={row.skillAssist}
                          onChange={(e) => updateCellValue(rowIndex, 'skillAssist', e.target.value)}
                          onFocus={() => setEditingCell({ rowIndex, field: 'skillAssist' })}
                          onBlur={() => setEditingCell(null)}
                          className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none rounded text-right"
                        />
                      </td>
                      <td className="p-2 border-r text-right">
                        <input
                          type="text"
                          value={row.skillHit}
                          onChange={(e) => updateCellValue(rowIndex, 'skillHit', e.target.value)}
                          onFocus={() => setEditingCell({ rowIndex, field: 'skillHit' })}
                          onBlur={() => setEditingCell(null)}
                          className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none rounded text-right"
                        />
                      </td>
                      <td className="p-2 text-right">
                        <input
                          type="text"
                          value={row.healing}
                          onChange={(e) => updateCellValue(rowIndex, 'healing', e.target.value)}
                          onFocus={() => setEditingCell({ rowIndex, field: 'healing' })}
                          onBlur={() => setEditingCell(null)}
                          className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none rounded text-right font-semibold"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
            <p>Click any cell to edit the value. Changes are saved automatically.</p>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <TriangleAlert className="h-5 w-5" />
          For better results
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Use high-resolution damage statistics screenshots</li>
          <li>Ensure good contrast between text and background</li>
          <li>Use screenshot image similar below, you can get it from the career / match history</li>
        </ul>
        <div className="mt-4 relative w-full max-w-md aspect-video rounded-lg overflow-hidden mx-auto">
          <Image
            src="/example/skill.png"
            alt="Skill Statistics Example"
            fill
            className="object-contain"
          />
          </div>
      </div>
    </div>
  </div>
  );
}
