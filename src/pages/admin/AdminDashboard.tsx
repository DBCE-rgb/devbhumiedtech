import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTestimonials, useGallery, useCourses } from '@/hooks/useAdminData';
import { MessageSquare, Image, BookOpen, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const { data: testimonials } = useTestimonials();
  const { data: gallery } = useGallery();
  const { data: courses } = useCourses();

  const stats = [
    {
      title: 'Total Testimonials',
      value: testimonials?.length || 0,
      icon: MessageSquare,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Gallery Items',
      value: gallery?.length || 0,
      icon: Image,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Active Courses',
      value: courses?.filter(c => c.is_active).length || 0,
      icon: BookOpen,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Total Courses',
      value: courses?.length || 0,
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the admin panel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Testimonials</CardTitle>
            </CardHeader>
            <CardContent>
              {testimonials?.slice(0, 5).map((t) => (
                <div key={t.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <div className="flex-1">
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{t.content.slice(0, 50)}...</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {'⭐'.repeat(t.rating)}
                  </div>
                </div>
              ))}
              {!testimonials?.length && (
                <p className="text-muted-foreground text-center py-4">No testimonials yet</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Use the sidebar to navigate and manage:
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Add, edit, or remove testimonials</li>
                <li>Upload and manage gallery photos</li>
                <li>Update course information and videos</li>
                <li>Customize site colors and theme</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
