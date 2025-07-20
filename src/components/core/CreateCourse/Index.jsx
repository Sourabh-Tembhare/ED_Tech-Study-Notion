import { useSelector } from "react-redux";
import RenderSteps from "./RenderSteps";
import CourseInformation from "./CourseInformation/CourseInformation";
import CoursePublish from "./CoursePublish/CoursePublish";
import CourseBuilder from "./CourseBuilder/CourseBuilder";


export default function CreateCourse(){
    const stepNumber = useSelector((state) => state.course.step);
    const {myCourseEdit} = useSelector((state)=> state.course);
    return(
        <>
        <div className="ml-4 text-richblack-5 mt-4 flex gap-24 flex-col lg:flex-row ">
            <div className="flex gap-8 flex-col lg:w-[56%] ">
                <p className="text-3xl font-semibold">{myCourseEdit ? "Edit Coures" : "Add Course"}</p>
                <div className="ml-4 flex flex-col gap-8">
                    <RenderSteps/>
                    {
                        stepNumber === 1 && <CourseInformation/>
                    }
                    {
                        stepNumber === 2 && <CourseBuilder/>
                    }
                    {
                        stepNumber === 3 && <CoursePublish/>
                    }
                </div>
            </div>
            <div className="bg-richblack-800 lg:w-[34%] p-6 rounded-md flex flex-col gap-6 h-fit">
               <div className="font-semibold lg:text-xl text-2xl -ml-5">
                ⚡Course Upload Tips
               </div>
               <ul className="list-disc flex flex-col gap-2 lg:text-xs text-xl">
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>
               </ul>
            </div>

        </div>
        
        </>
    )
}