interface Post {
  id: number;
  title: string;
  category: {
    id: number;
    name: string;
  };
  tags: string[];
  public: boolean;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}
