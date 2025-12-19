import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../../supabaseClient";
import { fetchTableData, uploadImage, deleteRecord } from "../Adminpage/adminHelpers";

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
}

const CoursesAdmin = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "" as string | File,
    duration: "",
  });

  /* ---------------- FETCH ---------------- */
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await fetchTableData("courses");
      setCourses(data);
    } catch (err) {
      console.error(err);
      setMessage("Error fetching courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /* ---------------- FORM CHANGE ---------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as any;
    if (type === "file") {
      setForm({ ...form, [name]: files?.[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* ---------------- MODAL ---------------- */
  const openModal = (course: Course | null = null) => {
    if (course) {
      setEditCourse(course);
      setForm({
        title: course.title,
        description: course.description,
        image: course.image,
        duration: course.duration,
      });
    } else {
      setEditCourse(null);
      setForm({
        title: "",
        description: "",
        image: "",
        duration: "",
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditCourse(null);
    setForm({
      title: "",
      description: "",
      image: "",
      duration: "",
    });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent double submission
    setLoading(true);

    try {
      const payload: any = {
        title: form.title,
        description: form.description,
        duration: form.duration,
      };

      if (form.image instanceof File) {
        const uploadedUrl = await uploadImage(form.image, "courses");
        payload.image = uploadedUrl;
      } else {
        payload.image = form.image;
      }

      if (editCourse) {
        const { error } = await supabase
          .from("courses")
          .update(payload)
          .eq("id", editCourse.id);
        if (error) throw error;
        setMessage("Course updated successfully");
      } else {
        const { error } = await supabase.from("courses").insert([payload]);
        if (error) throw error;
        setMessage("Course created successfully");
      }

      await fetchCourses(); // Refresh data
      closeModal();
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Error saving course");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this course?")) return;

    try {
      await deleteRecord("courses", id);
      setMessage("Course deleted successfully");
      fetchCourses();
    } catch (err) {
      console.error(err);
      setMessage("Error deleting course");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Courses Management</h1>
        <Button className="bg-green-600" onClick={() => openModal()}>
          Add Course
        </Button>
      </div>

      {message && (
        <div className="p-3 mb-4 rounded bg-gray-700">{message}</div>
      )}

      <div className="bg-gray-800 rounded-lg overflow-x-auto p-4">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th className="p-3 border-b border-gray-700">Image</th>
              <th className="p-3 border-b border-gray-700">Title</th>
              <th className="p-3 border-b border-gray-700">Duration</th>
              <th className="p-3 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length ? (
              courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-700">
                  <td className="p-3">
                    <img
                      src={course.image}
                      className="w-14 h-14 object-cover rounded"
                      alt={course.title}
                    />
                  </td>
                  <td className="p-3">{course.title}</td>
                  <td className="p-3">{course.duration}</td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <Button
                        className="bg-blue-600"
                        onClick={() => openModal(course)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-red-600"
                        onClick={() => handleDelete(course.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-gray-400">
                  {loading ? "Loading..." : "No courses found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">
              {editCourse ? "Edit Course" : "Add Course"}
            </h2>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                name="title"
                value={form.title}
                placeholder="Course Title"
                onChange={handleChange}
                className="w-full p-2 rounded text-black"
                required
              />

              <textarea
                name="description"
                value={form.description}
                placeholder="Course Description"
                onChange={handleChange}
                className="w-full p-2 rounded text-black min-h-[100px]"
              />

              <input
                name="duration"
                value={form.duration}
                placeholder="Duration (e.g., 6 months)"
                onChange={handleChange}
                className="w-full p-2 rounded text-black"
                required
              />

              {typeof form.image === "string" && form.image && (
                <img
                  src={form.image}
                  className="w-20 h-20 rounded object-cover"
                  alt="Preview"
                />
              )}

              <input
                name="image"
                type="file"
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black"
              />

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  className="bg-gray-600"
                  onClick={closeModal}
                >
                  Cancel
                </Button>

                <Button type="submit" className="bg-blue-600" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesAdmin;
