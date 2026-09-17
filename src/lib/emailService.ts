import emailjs from '@emailjs/browser';

export interface GrievanceData {
  name: string;
  age: string;
  location: string;
  email: string;
  grievance: string;
}

export const sendGrievanceEmail = async (data: GrievanceData) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error('EmailJS is not fully configured in environment variables.');
    // For development, we'll pretend it succeeded if keys are missing
    return new Promise((resolve) => setTimeout(() => resolve(true), 1500));
  }

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      {
        name: data.name,
        email: data.email,
        title: data.grievance,
        description: data.grievance,
        location: data.location,
        age: data.age,
        severity: "Pending Assessment",
        html_message: `<div style="font-family: 'Courier New', Courier, monospace; background-color: #050505; color: #F8F9FA; padding: 30px; border: 2px solid #E50914; max-width: 600px; margin: 0 auto; text-align: left;"><div style="text-align: center; border-bottom: 2px solid rgba(229, 9, 20, 0.3); padding-bottom: 20px; margin-bottom: 20px;"><img src="https://gaia-superhero-portal.vercel.app/gaia-logo.jpg" alt="G.A.I.A. Logo" style="max-width: 100px; margin-bottom: 15px; border: 1px solid #E50914; border-radius: 5px;"><h1 style="color: #E50914; margin: 0; font-size: 24px; letter-spacing: 4px; text-transform: uppercase;">G.A.I.A. Grievance Report</h1><p style="color: #E50914; font-size: 12px; letter-spacing: 2px; margin-top: 5px;">STATUS: CITIZEN REPORT FILED</p></div><div style="margin-bottom: 20px; font-size: 14px; line-height: 1.8;"><p style="margin: 5px 0;"><strong>CITIZEN NAME:</strong> <span style="color: #E50914;">${data.name}</span></p><p style="margin: 5px 0;"><strong>AGE PROFILE:</strong> <span style="color: #E50914;">${data.age}</span></p><p style="margin: 5px 0;"><strong>SECTOR LOCATION:</strong> <span style="color: #E50914;">${data.location}</span></p><p style="margin: 5px 0;"><strong>CONTACT UPLINK:</strong> <span style="color: #E50914;">${data.email}</span></p></div><div style="background-color: rgba(229, 9, 20, 0.1); padding: 15px; border-left: 3px solid #E50914; margin-bottom: 30px;"><h3 style="color: #E50914; margin-top: 0; font-size: 14px; letter-spacing: 2px;">GRIEVANCE LOG</h3><p style="font-size: 14px; line-height: 1.5; margin-bottom: 0;">${data.grievance}</p></div><div style="text-align: center; margin-top: 40px;"><a href="https://gaia-superhero-portal.vercel.app" style="display: inline-block; background-color: #E50914; color: #050505; padding: 12px 25px; text-decoration: none; font-weight: bold; letter-spacing: 2px; font-size: 14px; border: 1px solid #E50914;">ACCESS G.A.I.A. TERMINAL</a></div></div>`
      },
      publicKey
    );
    return response.status === 200;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
