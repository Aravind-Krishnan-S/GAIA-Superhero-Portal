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
        severity: "Pending Assessment"
      },
      publicKey
    );
    return response.status === 200;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
