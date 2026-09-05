export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rollNumber: string;
  branch: string;
  semester: string;
  cgpa: string;
  tenthPercent: string;
  twelfthPercent: string;
  linkedin: string;
  github: string;
  portfolio: string;
  bio: string;
  dob: string;
  gender: string;
  address: string;
  skills: string[];
  resumeUploaded: boolean;
}

export const defaultUser: UserProfile = {
  firstName: "Mayank",
  lastName: "Verma",
  email: "mayank.verma@college.edu",
  phone: "+91 98765 43210",
  rollNumber: "21CSE045",
  branch: "Computer Science & Engineering",
  semester: "8th Semester",
  cgpa: "8.4",
  tenthPercent: "92.4",
  twelfthPercent: "88.6",
  linkedin: "linkedin.com/in/mayankverma",
  github: "github.com/mayankverma",
  portfolio: "",
  bio: "Final year CSE student at NIT Raipur passionate about full-stack development, competitive programming, and cloud technologies.",
  dob: "2003-05-14",
  gender: "Male",
  address: "NIT Raipur Campus, G.E. Road, Raipur, Chhattisgarh – 492010",
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "SQL",
    "Git",
    "Data Structures",
    "Algorithms",
  ],
  resumeUploaded: false,
};
