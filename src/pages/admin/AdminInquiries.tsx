import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useInquiries, useUpdateInquiry, useDeleteInquiry, Inquiry } from '@/hooks/useAdminData';
import { 
  Mail, 
  MailOpen, 
  Trash2, 
  Loader2, 
  Download, 
  Search, 
  Phone, 
  Calendar,
  User,
  BookOpen,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { format } from 'date-fns';

const AdminInquiries = () => {
  const { data: inquiries, isLoading } = useInquiries();
  const updateMutation = useUpdateInquiry();
  const deleteMutation = useDeleteInquiry();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');

  const toggleReadStatus = async (inquiry: Inquiry) => {
    await updateMutation.mutateAsync({ 
      id: inquiry.id, 
      is_read: !inquiry.is_read 
    });
  };

  const exportToCSV = () => {
    if (!inquiries?.length) return;
    
    const headers = ['Name', 'Mobile', 'Email', 'Course Interested', 'Message', 'Status', 'Date'];
    const rows = inquiries.map(i => [
      i.name,
      i.mobile,
      i.email,
      i.course_interested || '',
      i.message?.replace(/"/g, '""') || '',
      i.is_read ? 'Read' : 'Unread',
      format(new Date(i.created_at), 'dd/MM/yyyy HH:mm')
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `inquiries_${format(new Date(), 'yyyyMMdd')}.csv`;
    link.click();
  };

  const filteredInquiries = inquiries?.filter(inquiry => {
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.mobile.includes(searchQuery) ||
      (inquiry.course_interested?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = 
      filterStatus === 'all' ||
      (filterStatus === 'read' && inquiry.is_read) ||
      (filterStatus === 'unread' && !inquiry.is_read);
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = inquiries?.filter(i => !i.is_read).length || 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Inquiries</h1>
            <p className="text-muted-foreground">
              Manage contact form submissions
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">{unreadCount} new</Badge>
              )}
            </p>
          </div>
          <Button onClick={exportToCSV} variant="outline" disabled={!inquiries?.length}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, phone, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={filterStatus === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilterStatus('all')}
            >
              All
            </Button>
            <Button 
              variant={filterStatus === 'unread' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilterStatus('unread')}
            >
              <Circle className="h-3 w-3 mr-1 fill-current" />
              Unread
            </Button>
            <Button 
              variant={filterStatus === 'read' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setFilterStatus('read')}
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Read
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInquiries?.map((inquiry) => (
              <Card 
                key={inquiry.id} 
                className={`transition-all ${!inquiry.is_read ? 'border-primary bg-primary/5' : ''}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {inquiry.is_read ? (
                        <MailOpen className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Mail className="h-5 w-5 text-primary" />
                      )}
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {inquiry.name}
                      </span>
                      {!inquiry.is_read && (
                        <Badge variant="default" className="ml-2">New</Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleReadStatus(inquiry)}
                        disabled={updateMutation.isPending}
                      >
                        {inquiry.is_read ? (
                          <>
                            <Circle className="h-4 w-4 mr-1" />
                            Mark Unread
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Mark Read
                          </>
                        )}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Inquiry?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete this inquiry. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteMutation.mutate(inquiry.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <a href={`tel:${inquiry.mobile}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Phone className="h-4 w-4" />
                      {inquiry.mobile}
                    </a>
                    <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Mail className="h-4 w-4" />
                      {inquiry.email}
                    </a>
                    {inquiry.course_interested && (
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {inquiry.course_interested}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(inquiry.created_at), 'dd MMM yyyy, hh:mm a')}
                    </span>
                  </div>
                  {inquiry.message && (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm whitespace-pre-wrap">{inquiry.message}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {!filteredInquiries?.length && (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  {searchQuery || filterStatus !== 'all' 
                    ? 'No inquiries match your search criteria.' 
                    : 'No inquiries yet. They will appear here when someone submits the contact form.'}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminInquiries;
