<HashRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/about" element={<About />} />
    <Route path="/courses" element={<Courses />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/testimonials" element={<Testimonials />} />
    <Route path="/admission" element={<Admission />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/testimonials" element={<AdminTestimonials />} />
    <Route path="/admin/gallery" element={<AdminGallery />} />
    <Route path="/admin/courses" element={<AdminCourses />} />
    <Route path="/admin/theme" element={<AdminTheme />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</HashRouter>

  </QueryClientProvider>
);

export default App;
