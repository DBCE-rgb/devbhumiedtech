import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSiteSettings, useUpdateSiteSettings } from '@/hooks/useAdminData';
import { 
  Loader2, 
  Save,
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactSettings {
  phone: string;
  email: string;
  address: string;
  office_hours: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

interface SeoSettings {
  meta_title: string;
  meta_description: string;
  og_image: string;
}

interface ContentSettings {
  homepage_hero_title: string;
  homepage_hero_subtitle: string;
  about_title: string;
  about_description: string;
  about_mission: string;
  about_vision: string;
}

const AdminSettings = () => {
  const { toast } = useToast();
  const { data: settings, isLoading } = useSiteSettings();
  const updateMutation = useUpdateSiteSettings();

  const [contactSettings, setContactSettings] = useState<ContactSettings>({
    phone: '+91-9805500827',
    email: 'devbhumicomputereducation@gmail.com',
    address: 'Thakur Complex, 2nd Floor, Kotla Nala, Opp. PNB Bank, Solan, Himachal Pradesh – 173212',
    office_hours: 'Monday - Saturday: 9:00 AM - 6:00 PM',
    facebook: '',
    instagram: '',
    youtube: ''
  });

  const [seoSettings, setSeoSettings] = useState<SeoSettings>({
    meta_title: 'Dev Bhumi Computer Academy - Best Computer Training in Solan',
    meta_description: 'Professional computer education institute offering courses in ADCA, DCA, Tally, and more. Join us for quality IT training in Solan, Himachal Pradesh.',
    og_image: ''
  });

  const [contentSettings, setContentSettings] = useState<ContentSettings>({
    homepage_hero_title: 'Build Your Future in Technology',
    homepage_hero_subtitle: 'Professional computer education with industry-recognized certifications',
    about_title: 'About Dev Bhumi Computer Academy',
    about_description: 'Established with a vision to provide quality computer education to students in Solan and surrounding areas.',
    about_mission: 'To empower students with practical computer skills and knowledge that prepare them for successful careers in the digital age.',
    about_vision: 'To become the leading computer education institute in Himachal Pradesh, known for quality education and student success.'
  });

  useEffect(() => {
    if (settings) {
      const contact = settings.find(s => s.setting_key === 'contact');
      const seo = settings.find(s => s.setting_key === 'seo');
      const content = settings.find(s => s.setting_key === 'content');
      
      if (contact?.setting_value) {
        setContactSettings(prev => ({ ...prev, ...(contact.setting_value as unknown as ContactSettings) }));
      }
      if (seo?.setting_value) {
        setSeoSettings(prev => ({ ...prev, ...(seo.setting_value as unknown as SeoSettings) }));
      }
      if (content?.setting_value) {
        setContentSettings(prev => ({ ...prev, ...(content.setting_value as unknown as ContentSettings) }));
      }
    }
  }, [settings]);

  const handleSaveContact = async () => {
    await updateMutation.mutateAsync({ key: 'contact', value: contactSettings as unknown as Record<string, string> });
    toast({ title: 'Contact settings saved', description: 'Your changes have been saved successfully.' });
  };

  const handleSaveSeo = async () => {
    await updateMutation.mutateAsync({ key: 'seo', value: seoSettings as unknown as Record<string, string> });
    toast({ title: 'SEO settings saved', description: 'Your changes have been saved successfully.' });
  };

  const handleSaveContent = async () => {
    await updateMutation.mutateAsync({ key: 'content', value: contentSettings as unknown as Record<string, string> });
    toast({ title: 'Content settings saved', description: 'Your changes have been saved successfully.' });
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
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage website content and configuration</p>
        </div>

        <Tabs defaultValue="contact" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Contact Info</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Content</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">SEO</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Update your contact details displayed on the website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={contactSettings.phone}
                      onChange={(e) => setContactSettings({ ...contactSettings, phone: e.target.value })}
                      placeholder="+91-XXXXXXXXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactSettings.email}
                      onChange={(e) => setContactSettings({ ...contactSettings, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Address
                  </Label>
                  <Textarea
                    id="address"
                    value={contactSettings.address}
                    onChange={(e) => setContactSettings({ ...contactSettings, address: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office_hours">Office Hours</Label>
                  <Input
                    id="office_hours"
                    value={contactSettings.office_hours}
                    onChange={(e) => setContactSettings({ ...contactSettings, office_hours: e.target.value })}
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input
                      id="facebook"
                      value={contactSettings.facebook}
                      onChange={(e) => setContactSettings({ ...contactSettings, facebook: e.target.value })}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram URL</Label>
                    <Input
                      id="instagram"
                      value={contactSettings.instagram}
                      onChange={(e) => setContactSettings({ ...contactSettings, instagram: e.target.value })}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube">YouTube URL</Label>
                    <Input
                      id="youtube"
                      value={contactSettings.youtube}
                      onChange={(e) => setContactSettings({ ...contactSettings, youtube: e.target.value })}
                      placeholder="https://youtube.com/..."
                    />
                  </div>
                </div>
                <Button onClick={handleSaveContact} disabled={updateMutation.isPending}>
                  {updateMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  <Save className="h-4 w-4 mr-2" />
                  Save Contact Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Website Content</CardTitle>
                <CardDescription>Update text content on your website pages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold">Homepage</h3>
                  <div className="space-y-2">
                    <Label htmlFor="hero_title">Hero Title</Label>
                    <Input
                      id="hero_title"
                      value={contentSettings.homepage_hero_title}
                      onChange={(e) => setContentSettings({ ...contentSettings, homepage_hero_title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
                    <Textarea
                      id="hero_subtitle"
                      value={contentSettings.homepage_hero_subtitle}
                      onChange={(e) => setContentSettings({ ...contentSettings, homepage_hero_subtitle: e.target.value })}
                      rows={2}
                    />
                  </div>
                </div>

                <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold">About Page</h3>
                  <div className="space-y-2">
                    <Label htmlFor="about_title">Page Title</Label>
                    <Input
                      id="about_title"
                      value={contentSettings.about_title}
                      onChange={(e) => setContentSettings({ ...contentSettings, about_title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="about_description">Description</Label>
                    <Textarea
                      id="about_description"
                      value={contentSettings.about_description}
                      onChange={(e) => setContentSettings({ ...contentSettings, about_description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="about_mission">Mission</Label>
                      <Textarea
                        id="about_mission"
                        value={contentSettings.about_mission}
                        onChange={(e) => setContentSettings({ ...contentSettings, about_mission: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="about_vision">Vision</Label>
                      <Textarea
                        id="about_vision"
                        value={contentSettings.about_vision}
                        onChange={(e) => setContentSettings({ ...contentSettings, about_vision: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveContent} disabled={updateMutation.isPending}>
                  {updateMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  <Save className="h-4 w-4 mr-2" />
                  Save Content Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Optimize your website for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">
                    Meta Title <span className="text-muted-foreground text-xs">(max 60 characters)</span>
                  </Label>
                  <Input
                    id="meta_title"
                    value={seoSettings.meta_title}
                    onChange={(e) => setSeoSettings({ ...seoSettings, meta_title: e.target.value })}
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground">{seoSettings.meta_title.length}/60 characters</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta_description">
                    Meta Description <span className="text-muted-foreground text-xs">(max 160 characters)</span>
                  </Label>
                  <Textarea
                    id="meta_description"
                    value={seoSettings.meta_description}
                    onChange={(e) => setSeoSettings({ ...seoSettings, meta_description: e.target.value })}
                    maxLength={160}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">{seoSettings.meta_description.length}/160 characters</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="og_image">Social Share Image URL</Label>
                  <Input
                    id="og_image"
                    value={seoSettings.og_image}
                    onChange={(e) => setSeoSettings({ ...seoSettings, og_image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <Button onClick={handleSaveSeo} disabled={updateMutation.isPending}>
                  {updateMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  <Save className="h-4 w-4 mr-2" />
                  Save SEO Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
