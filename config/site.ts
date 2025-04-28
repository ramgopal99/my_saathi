import { Boxes, GraduationCap, LayoutGrid, Book, BookOpen, Heart, Video } from 'lucide-react'

export const siteConfig = {
  name: "My Saathi",
  description: "Learn ASL and explore 3D models",
  mainNav: [
    {
      title: "Products",
      href: "/products",
      icon: LayoutGrid,
      items: [
        {
          title: "Model Viewer",
          href: "/products/model-viewer",
          description: "View and interact with 3D sign language models",
          icon: Boxes
        },
        {
          title: "Learn ASL",
          href: "/products/learn-asl",
          description: "Interactive ASL lessons with 3D demonstrations",
          icon: GraduationCap
        },
      ],
    },
    {
      title: "Dictionary",
      href: "/dictionary",
      icon: Book,
    },
    {
      title: "Courses",
      href: "/courses",
      icon: BookOpen,
    },
    {
      title: "Community",
      href: "/community",
      icon: BookOpen,
    },
    {
      title: "Volunteer",
      href: "/volunteering",
      icon: Heart
    },
    {
      title: "Video Sample",
      href: "/video-sample",
      icon: Video
    },
  ],
} 