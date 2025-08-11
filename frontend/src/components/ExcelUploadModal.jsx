import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const ExcelUploadModal = ({ isOpen, onClose, onUploadSuccess }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleFileSelect = (file) => {
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                 file.type === 'application/vnd.ms-excel' ||
                 file.name.endsWith('.xlsx') || 
                 file.name.endsWith('.xls'))) {
      setUploadedFile(file);
    } else {
      toast({
        title: "Неверный формат файла",
        description: "Пожалуйста, выберите файл Excel (.xlsx или .xls)",
        variant: "destructive"
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const processUpload = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);

    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock processed data (in real implementation, this would parse the Excel file)
      const mockProcessedData = [
        {
          id: "NEW001",
          title: "Новая конструкция из Excel",
          format: "Медиаборд",
          category: "Алматы",
          coordinates: "43.238293,76.889311",
          size: "3x2",
          // ... other fields
        }
      ];

      toast({
        title: "Файл успешно обработан",
        description: `Загружено ${mockProcessedData.length} новых конструкций`,
      });

      onUploadSuccess(mockProcessedData);
      handleClose();
    } catch (error) {
      toast({
        title: "Ошибка обработки файла",
        description: "Произошла ошибка при обработке Excel файла",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setUploadedFile(null);
    setIsProcessing(false);
    setIsDragOver(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Загрузить Excel файл
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* File Upload Area */}
          {!uploadedFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                isDragOver 
                  ? 'border-red-400 bg-red-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Перетащите файл сюда или
              </p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="mb-4"
              >
                Выбрать файл
              </Button>
              <p className="text-sm text-gray-500">
                Поддерживаемые форматы: .xlsx, .xls
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  onClick={removeFile}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Expected Format Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Ожидаемый формат файла:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• ID - Уникальный идентификатор</li>
              <li>• Наименование конструкции (адрес)</li>
              <li>• Формат (Медиаборд/Ситиборд)</li>
              <li>• Размер</li>
              <li>• Координаты (широта,долгота)</li>
              <li>• Локация (Категория)</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1"
              disabled={isProcessing}
            >
              Отмена
            </Button>
            <Button
              onClick={processUpload}
              disabled={!uploadedFile || isProcessing}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Обработка...
                </div>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Загрузить
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExcelUploadModal;