import chat1 from "../assets/chat1.png";
import user1 from "../assets/user1.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";
import avatar from "../assets/avatar.png";
import chatIcon from "../assets/chatIcon.png";
import login1 from "../assets/login1.jpg";
import login2 from "../assets/login2.jpg";

export const assets = {
  chat1,
  avatar,
  chatIcon,
  user1,
  user2,
  user3,
  login1,
  login2,
};

export const imagesDummyData = [user1, user2, user3];

export const userDummyData = [
  {
    _id: "1",
    email: "celz.dev01@example.com",
    fullName: "Celestine Okoro",
    profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
    bio: "Frontend developer who loves building sleek UI and scalable web apps. Big on clean architecture and performance.",
    isOnline: true,
  },
  {
    _id: "2",
    email: "amara.codes@example.com",
    fullName: "Amara Nwosu",
    profilePic: "https://randomuser.me/api/portraits/women/22.jpg",
    bio: "React and Next.js enthusiast. Obsessed with user experience and turning complex ideas into simple products.",
    isOnline: false,
  },
  {
    _id: "3",
    email: "tobi.tech@example.com",
    fullName: "Tobi Adeyemi",
    profilePic: "https://randomuser.me/api/portraits/men/33.jpg",
    bio: "Full-stack engineer with a thing for APIs and state management. Loves shipping fast and learning faster.",
    isOnline: true,
  },
  {
    _id: "4",
    email: "zara.builds@example.com",
    fullName: "Zara Bello",
    profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "UI/UX-focused developer blending design and code. Accessibility and responsiveness are non-negotiable.",
    isOnline: false,
  },
  {
    _id: "5",
    email: "david.stack@example.com",
    fullName: "David Eze",
    profilePic: "https://randomuser.me/api/portraits/men/55.jpg",
    bio: "Backend-leaning engineer who enjoys optimizing systems and writing clean, maintainable code.",
    isOnline: true,
  },
];

export const messsagesDummyData = [
  {
    _id: "101",
    senderId: "1",
    recieverId: "2",
    text: "Hey, did you push the latest changes to the repo?",
    seen: true,
    createdAt: "2026-02-20T09:15:30.000Z",
    image: "",
  },
  {
    _id: "102",
    senderId: "2",
    recieverId: "1",
    text: "Yeah I did. Check the dev branch and pull.",
    seen: true,
    createdAt: "2026-02-20T09:17:02.000Z",
    image: "",
  },
  {
    _id: "103",
    senderId: "3",
    recieverId: "1",
    text: "Can we refactor that API call? It’s kinda messy.",
    seen: false,
    createdAt: "2026-02-20T10:05:11.000Z",
    image: "",
  },
];
