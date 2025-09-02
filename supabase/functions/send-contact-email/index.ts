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
    console.log("Raw request body length:", requestBody.length);
    
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
    console.log("Parsed form data:", { 
      name: name ? `"${name}"` : "missing", 
      email: email ? `"${email}"` : "missing", 
      message: message ? `"${message.substring(0, 50)}..."` : "missing" 
    });

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

    // Send email using EmailJS public API
    console.log("Attempting to send business notification email via EmailJS");
    
    const businessEmailData = {
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
    };
    
    console.log("Business email data:", JSON.stringify(businessEmailData, null, 2));
    
    try {
      const businessResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(businessEmailData)
      });

      const businessResponseText = await businessResponse.text();
      console.log("Business email response status:", businessResponse.status);
      console.log("Business email response body:", businessResponseText);

      if (!businessResponse.ok) {
        throw new Error(`Business email failed: ${businessResponse.status} - ${businessResponseText}`);
      }

      console.log("✅ Business email sent successfully");
    } catch (businessError) {
      console.error("❌ Business email error:", businessError);
      throw businessError;
    }

    // Send confirmation email to user
    console.log("Attempting to send confirmation email to user:", email);
    
    const confirmationEmailData = {
      service_id: 'service_contact',
      template_id: 'template_confirmation',
      user_id: 'IyjcmiRWiBVeiMS9a', 
      template_params: {
        to_email: email,
        to_name: name || 'there',
        user_message: message || 'No message provided',
        subject: 'We hebben je bericht ontvangen - Liever Turks dan Paaps'
      }
    };

    try {
      const confirmationResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(confirmationEmailData)
      });

      const confirmationResponseText = await confirmationResponse.text();
      console.log("Confirmation email response status:", confirmationResponse.status);
      console.log("Confirmation email response body:", confirmationResponseText);

      if (confirmationResponse.ok) {
        console.log("✅ Confirmation email sent successfully");
      } else {
        console.warn("⚠️ Confirmation email failed (non-critical):", confirmationResponseText);
      }
    } catch (confirmationError) {
      console.warn("⚠️ Confirmation email error (non-critical):", confirmationError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Message sent successfully to info@lieverturksdanpaaps.nl" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("❌ Critical error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: `Failed to send email: ${error.message || 'Unknown error'}` 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);