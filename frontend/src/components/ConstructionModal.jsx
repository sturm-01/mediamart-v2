import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Download, MapPin, Ruler, Eye, Building } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const ConstructionModal = ({ construction, isOpen, onClose }) => {
  const { toast } = useToast();

  if (!construction) return null;

  const handleDownload = (format) => {
    toast({
      title: `Скачивание ${format.toUpperCase()}`,
      description: `Файл с данными конструкции ID: ${construction.id}`,
    });

    // Simulate file download
    setTimeout(() => {
      const content = `Construction ID: ${construction.id}\nTitle: ${construction.title}\nFormat: ${construction.format}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `construction_${construction.id}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    }, 500);
  };

  const details = [
    { label: 'ID', value: construction.externalId || construction.id, icon: <Building className="h-4 w-4" /> },
    { label: 'Адрес', value: construction.address, icon: <MapPin className="h-4 w-4" /> },
    { label: 'Формат', value: construction.format, icon: <Eye className="h-4 w-4" /> },
    { label: 'Размер', value: construction.size || 'Не указан', icon: <Ruler className="h-4 w-4" /> },
    { label: 'Локация', value: construction.category || construction.city, icon: <MapPin className="h-4 w-4" /> },
    { label: 'Класс', value: construction.classification || 'Не указан', icon: <Building className="h-4 w-4" /> },
    { label: 'Освещение', value: construction.lighting || 'Не указано', icon: <Eye className="h-4 w-4" /> },
    { label: 'Направление', value: construction.orientation || 'Не указано', icon: <Eye className="h-4 w-4" /> },
    { label: 'Статус', value: construction.status || 'Active', icon: <Eye className="h-4 w-4" /> },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Конструкция #{construction.externalId || construction.id}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Construction Image */}
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={`https://via.placeholder.com/600x400/1a365d/ffffff?text=ID+${construction.externalId || construction.id}`}
              alt={construction.address}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Format Badge */}
          <div className="flex justify-center">
            <Badge 
              className={`text-sm px-4 py-2 ${
                construction.format === 'Медиаборд' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {construction.format}
            </Badge>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {details.map((detail, index) => (
              <Card key={index} className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-red-500">
                      {detail.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">{detail.label}</div>
                      <div className="font-medium text-gray-900">{detail.value}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Information */}
          {construction.printRequirement && construction.printRequirement !== 'nan' && (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-amber-800 mb-2">Требования к печати:</h4>
                <p className="text-amber-700">{construction.printRequirement}</p>
              </CardContent>
            </Card>
          )}

          {/* Coordinates */}
          {construction.lat && construction.lng && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Координаты:</h4>
                <p className="text-blue-700 font-mono">{construction.lat}, {construction.lng}</p>
              </CardContent>
            </Card>
          )}

          {/* Download Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <Button
              onClick={() => handleDownload('pdf')}
              className="flex items-center bg-red-600 hover:bg-red-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Скачать PDF
            </Button>
            <Button
              onClick={() => handleDownload('ppt')}
              variant="outline"
              className="flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Скачать PPT
            </Button>
            <Button
              onClick={() => handleDownload('xls')}
              variant="outline"
              className="flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Скачать XLS
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConstructionModal;