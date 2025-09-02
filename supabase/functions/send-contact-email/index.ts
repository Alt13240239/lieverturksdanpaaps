import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

    // Send email to business using EmailJS
    console.log("Attempting to send email via EmailJS");
    const businessEmailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_contact',
        template_id: 'template_business',
        user_id: 'IyjcmiRWiBVeiMS9a',
        template_params: {
          to_email: 'info@lieverturksdanpaaps.nl',
          from_name: name || 'Anonymous',
          from_email: email,
          message: message || 'No message provided',
          subject: 'New Contact Form Submission - Liever Turks dan Paaps'
        }
      })
    });

    if (!businessEmailResponse.ok) {
      const errorText = await businessEmailResponse.text();
      console.error("Business email failed:", errorText);
      throw new Error(`Business email failed: ${businessEmailResponse.status}`);
    }

    console.log("Business email sent successfully");

    // Send confirmation email to user using EmailJS
    console.log("Sending confirmation email to user:", email);
    const confirmationEmailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_contact',
        template_id: 'template_confirmation',
        user_id: 'IyjcmiRWiBVeiMS9a',
        template_params: {
          to_email: email,
          to_name: name || 'daar',
          user_message: message || 'Geen bericht opgegeven',
          subject: 'We hebben je bericht ontvangen - Liever Turks dan Paaps'
        }
      })
    });

    if (!confirmationEmailResponse.ok) {
      const errorText = await confirmationEmailResponse.text();
      console.error("Confirmation email failed:", errorText);
      // Don't throw here - business email was successful
    } else {
      console.log("Confirmation email sent successfully");
    }

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