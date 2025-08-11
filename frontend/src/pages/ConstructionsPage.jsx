import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Download, Upload, Search, MapPin, Eye, Filter } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import ConstructionModal from '../components/ConstructionModal';
import ExcelUploadModal from '../components/ExcelUploadModal';
import YandexMap from '../components/YandexMap';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ConstructionsPage = () => {
  const [constructions, setConstructions] = useState([]);
  const [filteredConstructions, setFilteredConstructions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formatFilter, setFormatFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedConstruction, setSelectedConstruction] = useState(null);
  const [isConstructionModalOpen, setIsConstructionModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedConstructions, setSelectedConstructions] = useState([]);
  const { toast } = useToast();

  // Load constructions from backend
  const loadConstructions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (searchTerm) params.append('q', searchTerm);
      if (formatFilter !== 'all') {
        params.append('format', formatFilter === 'mediaboard' ? 'Медиаборд' : 'Ситиборд');
      }
      params.append('limit', '500'); // Load more constructions

      const response = await axios.get(`${API}/constructions?${params.toString()}`);
      const data = response.data;
      
      setConstructions(data.items || []);
      setFilteredConstructions(data.items || []);
    } catch (error) {
      console.error('Error loading constructions:', error);
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить конструкции",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConstructions();
  }, [searchTerm, formatFilter]);

  // Filter constructions based on search and format
  const filteredResults = useMemo(() => {
    return constructions.filter(construction => {
      const matchesSearch = construction.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          construction.externalId?.toString().includes(searchTerm);
      
      const matchesFormat = formatFilter === 'all' || 
                           (formatFilter === 'mediaboard' && construction.format === 'Медиаборд') ||
                           (formatFilter === 'cityboard' && construction.format === 'Ситиборд');
      
      return matchesSearch && matchesFormat;
    });
  }, [constructions, searchTerm, formatFilter]);

  useEffect(() => {
    setFilteredConstructions(filteredResults);
  }, [filteredResults]);

  const handleConstructionClick = (construction) => {
    setSelectedConstruction(construction);
    setIsConstructionModalOpen(true);
  };

  const handleDownload = (format) => {
    const selectedIds = selectedConstructions.length > 0 
      ? selectedConstructions 
      : filteredConstructions.map(c => c.id);
    
    toast({
      title: `Скачивание ${format.toUpperCase()}`,
      description: `Готовится файл с ${selectedIds.length} конструкциями`,
    });

    // Use the backend download API
    const downloadUrl = `${API}/files/download/${format}/${Date.now()}?ids=${selectedIds.join(',')}`;
    window.open(downloadUrl, '_blank');
  };

  const toggleConstructionSelection = (constructionId) => {
    setSelectedConstructions(prev => 
      prev.includes(constructionId)
        ? prev.filter(id => id !== constructionId)
        : [...prev, constructionId]
    );
  };

  const selectAllFilteredConstructions = () => {
    const allFilteredIds = filteredConstructions.map(c => c.id);
    setSelectedConstructions(allFilteredIds);
  };

  const clearSelection = () => {
    setSelectedConstructions([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Конструкции наружной рекламы</h1>
              <p className="text-gray-600">
                Найдено: {filteredConstructions.length} из {constructions.length} конструкций
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => handleDownload('pdf')}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button
                onClick={() => handleDownload('ppt')}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                PPT
              </Button>
              <Button
                onClick={() => handleDownload('xls')}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                XLS
              </Button>
              <Button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 flex items-center"
                size="sm"
              >
                <Upload className="h-4 w-4 mr-2" />
                Загрузить Excel
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar with filters and list */}
          <div className="lg:col-span-4">
            {/* Filters */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Фильтры
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Поиск по ID или адресу..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Format Filter */}
                <div>
                  <Label className="text-sm font-medium">Формат</Label>
                  <Select value={formatFilter} onValueChange={setFormatFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Показывать все</SelectItem>
                      <SelectItem value="mediaboard">Только медиаборды</SelectItem>
                      <SelectItem value="cityboard">Только ситиборды</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Selection Actions */}
                {selectedConstructions.length > 0 && (
                  <div className="flex gap-2">
                    <Button
                      onClick={selectAllFilteredConstructions}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Выбрать все
                    </Button>
                    <Button
                      onClick={clearSelection}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Очистить
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Construction List */}
            <div className="max-h-96 overflow-y-auto space-y-3">
              {filteredConstructions.map((construction) => (
                <Card
                  key={construction.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedConstructions.includes(construction.id) ? 'ring-2 ring-red-500' : ''
                  }`}
                  onClick={() => handleConstructionClick(construction)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedConstructions.includes(construction.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleConstructionSelection(construction.id);
                        }}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            ID: {construction.id}
                          </Badge>
                          <Badge 
                            className={`text-xs ${
                              construction.format === 'Медиаборд' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {construction.format}
                          </Badge>
                        </div>
                        <h3 className="font-medium text-sm text-gray-900 truncate">
                          {construction.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {construction.location}
                        </p>
                      </div>
                      <img
                        src={construction.image}
                        alt={construction.title}
                        className="w-12 h-12 object-cover rounded border"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Карта конструкций
                </CardTitle>
              </CardHeader>
              <CardContent>
                <YandexMap 
                  constructions={filteredConstructions}
                  onConstructionClick={handleConstructionClick}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ConstructionModal
        construction={selectedConstruction}
        isOpen={isConstructionModalOpen}
        onClose={() => setIsConstructionModalOpen(false)}
      />

      <ExcelUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={(data) => {
          setConstructions(data);
          setFilteredConstructions(data);
          toast({
            title: "Файл загружен",
            description: `Загружено ${data.length} конструкций`,
          });
        }}
      />
    </div>
  );
};

const Label = ({ children, ...props }) => (
  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" {...props}>
    {children}
  </label>
);

export default ConstructionsPage;