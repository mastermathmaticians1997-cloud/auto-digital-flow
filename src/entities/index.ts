/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: casestudies
 * Interface for CaseStudies
 */
export interface CaseStudies {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectTitle?: string;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  industry?: string;
  /** @wixFieldType text */
  problemDescription?: string;
  /** @wixFieldType text */
  solutionImplemented?: string;
  /** @wixFieldType text */
  resultsAchieved?: string;
  /** @wixFieldType number */
  roiPercentage?: number;
  /** @wixFieldType image */
  chartImage?: string;
  /** @wixFieldType image */
  mainImage?: string;
  /** @wixFieldType date */
  dateCompleted?: Date | string;
}


/**
 * Collection ID: industries
 * Interface for Industries
 */
export interface Industries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  industryName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType image */
  industryImage?: string;
  /** @wixFieldType text */
  keyBenefits?: string;
  /** @wixFieldType text */
  slug?: string;
}


/**
 * Collection ID: pricingplans
 * Interface for PricingPlans
 */
export interface PricingPlans {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  planName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType text */
  priceUnit?: string;
  /** @wixFieldType text */
  features?: string;
  /** @wixFieldType text */
  callToActionText?: string;
  /** @wixFieldType url */
  callToActionUrl?: string;
  /** @wixFieldType boolean */
  isRecommended?: boolean;
}


/**
 * Collection ID: products
 * Interface for Products
 */
export interface Products {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  productName?: string;
  /** @wixFieldType text */
  productType?: string;
  /** @wixFieldType image */
  gridImage?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType text */
  keyFeatures?: string;
  /** @wixFieldType url */
  demoUrl?: string;
}


/**
 * Collection ID: resources
 * Interface for Resources
 */
export interface Resources {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  resourceType?: string;
  /** @wixFieldType text */
  summary?: string;
  /** @wixFieldType text */
  mainContent?: string;
  /** @wixFieldType date */
  publicationDate?: Date | string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType image */
  thumbnailImage?: string;
  /** @wixFieldType url */
  externalUrl?: string;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  tagline?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  serviceImage?: string;
  /** @wixFieldType text */
  keyBenefits?: string;
  /** @wixFieldType text */
  ctaText?: string;
  /** @wixFieldType url */
  ctaUrl?: string;
}


/**
 * Collection ID: testimonials
 * Interface for Testimonials
 */
export interface Testimonials {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  clientTitleCompany?: string;
  /** @wixFieldType text */
  testimonialText?: string;
  /** @wixFieldType image */
  clientPhoto?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType date */
  dateReceived?: Date | string;
}
