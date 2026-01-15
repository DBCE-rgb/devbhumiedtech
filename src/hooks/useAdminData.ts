import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Types
export interface Testimonial {
  id: string;
  name: string;
  course: string;
  content: string;
  rating: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  is_active: boolean;
  sort_order: number | null;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  color: string | null;
  features: string[] | null;
  video_url: string | null;
  is_active: boolean;
  sort_order: number | null;
  created_at: string;
  updated_at: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  [key: string]: string;
}

export interface Inquiry {
  id: string;
  name: string;
  mobile: string;
  email: string;
  course_interested: string | null;
  message: string | null;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: Record<string, string>;
  updated_at: string;
}

// Testimonials
export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Testimonial[];
    }
  });
};

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('testimonials')
        .insert(testimonial)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({ title: "Success", description: "Testimonial created" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Testimonial> & { id: string }) => {
      const { error } = await supabase
        .from('testimonials')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({ title: "Success", description: "Testimonial updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast({ title: "Success", description: "Testimonial deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });
};

// Gallery
export const useGallery = () => {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data as GalleryItem[];
    }
  });
};

export const useCreateGalleryItem = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (item: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('gallery')
        .insert(item)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast({ title: "Success", description: "Gallery item created" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });
};

export const useUpdateGalleryItem = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<GalleryItem> & { id: string }) => {
      const { error } = await supabase
        .from('gallery')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast({ title: "Success", description: "Gallery item updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });
};

export const useDeleteGalleryItem = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast({ title: "Success", description: "Gallery item deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });
};

// Courses
export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data as Course[];
    }
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (course: Omit<Course, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('courses')
        .insert(course)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({ title: "Success", description: "Course created" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Course> & { id: string }) => {
      const { error } = await supabase
        .from('courses')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({ title: "Success", description: "Course updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      toast({ title: "Success", description: "Course deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });
};

// Site Settings
export const useThemeColors = () => {
  return useQuery({
    queryKey: ['theme_colors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('setting_value')
        .eq('setting_key', 'theme_colors')
        .maybeSingle();
      if (error) throw error;
      const val = data?.setting_value as Record<string, string> | null;
      return val ? { primary: val.primary, secondary: val.secondary, accent: val.accent } : { primary: "221 83% 53%", secondary: "210 40% 96%", accent: "262 83% 58%" };
    }
  });
};

export const useUpdateThemeColors = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (colors: ThemeColors) => {
      const { error } = await supabase
        .from('site_settings')
        .update({ setting_value: colors })
        .eq('setting_key', 'theme_colors');
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['theme_colors'] });
      toast({ title: "Success", description: "Theme colors updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });
};

// Site Settings (all)
export const useSiteSettings = () => {
  return useQuery({
    queryKey: ['site_settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      if (error) throw error;
      return data as SiteSetting[];
    }
  });
};

export const useUpdateSiteSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: Record<string, string> }) => {
      // Try to update first
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .eq('setting_key', key)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('site_settings')
          .update({ setting_value: value })
          .eq('setting_key', key);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_settings')
          .insert({ setting_key: key, setting_value: value });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings'] });
    }
  });
};

// Inquiries
export const useInquiries = () => {
  return useQuery({
    queryKey: ['inquiries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Inquiry[];
    }
  });
};

export const useCreateInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inquiry: Omit<Inquiry, 'id' | 'is_read' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('inquiries')
        .insert(inquiry)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    }
  });
};

export const useUpdateInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Inquiry> & { id: string }) => {
      const { error } = await supabase
        .from('inquiries')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    }
  });
};

export const useDeleteInquiry = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      toast({ title: "Success", description: "Inquiry deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  });
};

// File Upload
export const useUploadFile = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ file, path }: { file: File; path: string }) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${path}/${Date.now()}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('media')
        .upload(fileName, file);
      
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);
      
      return publicUrl;
    },
    onError: (error: Error) => {
      toast({ title: "Upload Error", description: error.message, variant: "destructive" });
    }
  });
};
