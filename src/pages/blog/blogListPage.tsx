import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { contentService } from "../../services/contentServices";
import FrontendLayout from "../layout/frontendLayout";

export default function BlogListPage() {
  const { id } = useParams();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await contentService.getPosts();
        const allPosts = Array.isArray(res) ? res : res?.data?.data || [];

        const filtered = allPosts.filter((p: any) =>
          String(p.category) === String(id)
        );

        setPosts(filtered);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPosts();
  }, [id]);

  if (loading) return <div className="text-center p-20 font-bold">लोडिङ...</div>;

  return (
    <FrontendLayout>
      <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto p-2 md:p-3  ">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-5">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1e695e] flex items-center gap-3">
           
            {posts.length > 0 ? posts[0].category_name : "सामग्री सूची"}
          </h1>
         
        </div>

        {/* Main Grid: 12 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: Blog List (8 Columns) */}
          <div className="lg:col-span-8">
            {posts.length > 0 ? (
              <div className="flex flex-col gap-6">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded shadow-md overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-shadow">
                    {/* Post Image */}
                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                      <img 
                        src={post.photo || "/placeholder.jpg"} 
                        alt={post.title} 
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    
                    {/* Post Details */}
                    <div className="p-5 md:w-2/3 flex flex-col justify-center">
                      <h2 className="text-xl font-bold mb-2 group-hover:text-[#1e695e] transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4 italic">
                        {post.description?.replace(/<[^>]*>/g, "").substring(0, 150)}...
                      </p>
                      <Link to={`/blog/${post.slug}`} className="text-[#e44d26] font-bold text-sm hover:underline">
                        थप पढ्नुहोस् →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border rounded-xl">
                <AlertCircle size={50} className="mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500 font-bold">यो क्याटेगोरीमा डाटाहरू भेटिएनन्।</p>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Sidebar / Ads (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Sticky Ad Box */}
            <div className="sticky top-24 flex flex-col gap-6">
              
              {/* Ad Unit 1 */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-4 min-h-[250px] flex flex-center items-center justify-center text-center">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Advertisement</span>
                  <div className="mt-4 text-gray-500 italic">तपाईंको विज्ञापन यहाँ राख्न सकिन्छ</div>
                </div>
              </div>

              {/* Ad Unit 2 */}
              <div className="bg-[#1e695e]/5 border border-[#1e695e]/20 rounded-xl p-6">
                <h3 className="font-bold text-[#1e695e] mb-4 border-b pb-2">ताजा अपडेट</h3>
                <ul className="text-sm flex flex-col gap-3">
                  <li className="hover:text-[#e44d26] cursor-pointer">• नयाँ सुविधाहरू सार्वजनिक</li>
                  <li className="hover:text-[#e44d26] cursor-pointer">• आगामी कार्यक्रमको बारेमा</li>
                  <li className="hover:text-[#e44d26] cursor-pointer">• हाम्रा उत्कृष्ट ब्लगहरू</li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
      </section>
    </FrontendLayout>
  );
}