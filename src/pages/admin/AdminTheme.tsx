import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useThemeColors, useUpdateThemeColors, ThemeColors } from '@/hooks/useAdminData';
import { Loader2, Palette, RotateCcw, Save } from 'lucide-react';

const defaultColors: ThemeColors = {
  primary: "221 83% 41%",
  secondary: "214 100% 97%",
  accent: "142 71% 45%"
};

const AdminTheme = () => {
  const { data: savedColors, isLoading } = useThemeColors();
  const updateMutation = useUpdateThemeColors();
  
  const [colors, setColors] = useState<ThemeColors>(defaultColors);
  const [previewColors, setPreviewColors] = useState<ThemeColors>(defaultColors);

  useEffect(() => {
    if (savedColors) {
      setColors(savedColors);
      setPreviewColors(savedColors);
    }
  }, [savedColors]);

  const hslToHex = (hsl: string): string => {
    const [h, s, l] = hsl.split(' ').map((v, i) => i === 0 ? parseFloat(v) : parseFloat(v.replace('%', '')));
    const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l / 100 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const hexToHsl = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const handleColorChange = (key: keyof ThemeColors, hexValue: string) => {
    const hslValue = hexToHsl(hexValue);
    setPreviewColors({ ...previewColors, [key]: hslValue });
  };

  const handleSave = async () => {
    await updateMutation.mutateAsync(previewColors);
    setColors(previewColors);
    
    // Apply to document
    document.documentElement.style.setProperty('--primary', previewColors.primary);
    document.documentElement.style.setProperty('--secondary', previewColors.secondary);
    document.documentElement.style.setProperty('--accent', previewColors.accent);
  };

  const handleReset = () => {
    setPreviewColors(defaultColors);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Theme Colors</h1>
          <p className="text-muted-foreground">Customize your website's color scheme</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Settings
              </CardTitle>
              <CardDescription>
                Choose colors for your website theme. Changes will be saved to the database.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="primary">Primary Color</Label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="primary"
                    type="color"
                    value={hslToHex(previewColors.primary)}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground font-mono">{previewColors.primary}</span>
                </div>
                <p className="text-xs text-muted-foreground">Main brand color for buttons, links, and highlights</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary">Secondary Color</Label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="secondary"
                    type="color"
                    value={hslToHex(previewColors.secondary)}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground font-mono">{previewColors.secondary}</span>
                </div>
                <p className="text-xs text-muted-foreground">Background color for cards and sections</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accent">Accent Color</Label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="accent"
                    type="color"
                    value={hslToHex(previewColors.accent)}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground font-mono">{previewColors.accent}</span>
                </div>
                <p className="text-xs text-muted-foreground">Accent color for highlights and success states</p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} disabled={updateMutation.isPending} className="flex-1">
                  {updateMutation.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>See how your colors will look</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="p-4 rounded-lg text-white font-medium"
                style={{ backgroundColor: `hsl(${previewColors.primary})` }}
              >
                Primary Button
              </div>
              <div 
                className="p-4 rounded-lg border"
                style={{ backgroundColor: `hsl(${previewColors.secondary})` }}
              >
                Secondary Background
              </div>
              <div 
                className="p-4 rounded-lg text-white font-medium"
                style={{ backgroundColor: `hsl(${previewColors.accent})` }}
              >
                Accent Element
              </div>
              
              <div className="p-4 border rounded-lg space-y-3">
                <h3 className="font-semibold" style={{ color: `hsl(${previewColors.primary})` }}>
                  Sample Heading
                </h3>
                <p className="text-muted-foreground text-sm">
                  This is how your text content will appear with the new color scheme.
                </p>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: `hsl(${previewColors.primary})` }}
                  >
                    Primary
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: `hsl(${previewColors.accent})` }}
                  >
                    Accent
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTheme;
