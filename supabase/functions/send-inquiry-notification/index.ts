import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InquiryEmailRequest {
  name: string;
  email: string;
  phone: string;
  course?: string;
  subject?: string;
  message: string;
  inquiryType: "contact" | "admission";
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, course, subject, message, inquiryType }: InquiryEmailRequest = await req.json();

    const inquiryLabel = inquiryType === "admission" ? "Admission Inquiry" : "Contact Inquiry";

    // Email to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">New ${inquiryLabel}</h1>
        </div>
        <div style="padding: 20px; background: #f9fafb;">
          <h2 style="color: #1f2937;">Contact Details:</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            ${course ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Course:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${course}</td>
            </tr>
            ` : ''}
            ${subject ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Subject:</td>
              <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${subject}</td>
            </tr>
            ` : ''}
          </table>
          <h3 style="color: #1f2937; margin-top: 20px;">Message:</h3>
          <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
            ${message}
          </div>
          <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px;">
            <p style="margin: 0; color: #1e40af;">
              <strong>Action Required:</strong> Please respond to this inquiry within 24 hours.
            </p>
          </div>
        </div>
        <div style="padding: 20px; background: #1f2937; text-align: center;">
          <p style="color: #9ca3af; margin: 0;">Dev Bhumi Computer Academy - Solan, HP</p>
        </div>
      </div>
    `;

    // Email to user (confirmation)
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Thank You for Contacting Us!</h1>
        </div>
        <div style="padding: 20px; background: #f9fafb;">
          <p style="font-size: 16px;">Dear <strong>${name}</strong>,</p>
          <p>Thank you for reaching out to Dev Bhumi Computer Academy. We have received your ${inquiryType === "admission" ? "admission inquiry" : "message"} and our team will get back to you within 24 hours.</p>
          
          <h3 style="color: #1f2937;">Your Inquiry Summary:</h3>
          <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
            ${course ? `<p><strong>Course Interest:</strong> ${course}</p>` : ''}
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
            <p><strong>Message:</strong> ${message}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #dcfce7; border-radius: 8px;">
            <p style="margin: 0; color: #166534;">
              <strong>What's Next?</strong> Our admission team will contact you at <strong>${phone}</strong> to discuss your requirements.
            </p>
          </div>

          <div style="margin-top: 20px;">
            <p><strong>Contact Us:</strong></p>
            <p>📞 Phone: +91-9805500827</p>
            <p>📧 Email: devbhumicomputereducation@gmail.com</p>
            <p>📍 Location: Solan, Himachal Pradesh</p>
          </div>
        </div>
        <div style="padding: 20px; background: #1f2937; text-align: center;">
          <p style="color: #9ca3af; margin: 0;">Dev Bhumi Computer Academy - Quality Computer Education</p>
        </div>
      </div>
    `;

    // Send email to admin
    const adminEmail = await resend.emails.send({
      from: "Dev Bhumi Academy <onboarding@resend.dev>",
      to: ["devbhumicomputereducation@gmail.com"],
      subject: `New ${inquiryLabel}: ${name}${course ? ` - ${course}` : ''}`,
      html: adminEmailHtml,
    });

    console.log("Admin email sent:", adminEmail);

    // Send confirmation email to user
    const userEmail = await resend.emails.send({
      from: "Dev Bhumi Academy <onboarding@resend.dev>",
      to: [email],
      subject: `Thank you for contacting Dev Bhumi Computer Academy`,
      html: userEmailHtml,
    });

    console.log("User email sent:", userEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmail.id, 
        userEmail: userEmail.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-inquiry-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
