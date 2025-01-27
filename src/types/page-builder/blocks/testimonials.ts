export type TestimonialBlockType = {
  _id: string;
  _key: string;
  _type: 'testimonialBlock';
  heading: string;
  eyebrow: string;
  testimonials: TestimonialType[];
  anchorId?: string;
  cornerRadiusTop: 'rounded' | 'straight';
  cornerRadiusBottom: 'rounded' | 'straight';
}

export type TestimonialType = {
  _id: string;
  name: string;
  jobTitle: string; 
  company: string;
  quote: string;
  avatar: {
    asset: {
      url: string;
    }
  };
  logo: {
    asset: {
      url: string;
    }
  };
}