import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Edge function called with method:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing contact form request");
    const requestBody = await req.text();
    console.log("Raw request body:", requestBody);
    
    let parsedBody: ContactEmailRequest;
    try {
      parsedBody = JSON.parse(requestBody);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, message } = parsedBody;
    console.log("Parsed form data:", { name: name ? "provided" : "missing", email: email ? "provided" : "missing", message: message ? "provided" : "missing" });

    // Validate required fields
    if (!email || !email.includes('@')) {
      console.log("Email validation failed:", email);
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Check if Resend API key is available
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is not set");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    console.log("Resend API key found");

    // Send email to the business
    console.log("Attempting to send email via Resend");
    const emailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["info@lieverturksdanpaaps.nl"],
      subject: "New Contact Form Submission - Liever Turks dan Paaps",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${message || 'No message provided'}
        </div>
        <hr>
        <p style="color: #666; font-size: 12px;">This email was sent from the contact form on lieverturksdanpaaps.nl</p>
      `,
    });

    console.log("Contact email sent successfully:", emailResponse);

    // Send confirmation email to the user
    console.log("Sending confirmation email to user:", email);
    const confirmationResponse = await resend.emails.send({
      from: "Liever Turks dan Paaps <onboarding@resend.dev>",
      to: [email],
      subject: "We hebben je bericht ontvangen - Liever Turks dan Paaps",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Bedankt voor je bericht!</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
              Hallo ${name || 'daar'},
            </p>
            <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
              We hebben je bericht goed ontvangen en nemen zo snel mogelijk contact met je op.
            </p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #d4af37;">
              <p style="margin: 0; color: #333; font-style: italic;">
                "${message || 'Geen bericht opgegeven'}"
              </p>
            </div>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Met vriendelijke groet,<br>
              <strong>Team Liever Turks dan Paaps</strong>
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">
              Dit is een automatisch gegenereerd bericht van lieverturksdanpaaps.nl
            </p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent successfully:", confirmationResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);