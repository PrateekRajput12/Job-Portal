import { Job } from "../Models/job.Model"


export const postJob = async (req, res) => {
    try {
        const { title, description, salary, requirement, location, jobType, experience, position, companyId } = req.body
        const userId = req.id

        if (!title || !description || !salary || !requirement || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({ message: "SOmething is missing", success: false })
        }

        const job = await Job.create({
            title,
            description,
            requirement: requirement.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        })
        return res.status(200).json({
            message: "New Job created successfully",
            job,
            success: true
        })
    } catch (error) {
        console.log("err", error);
    }
}


// student
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""

        const query = {
            $or: [
                { title: { $regex: keyword, $option: "i" } },
                { description: { $regex: keyword, $option: "i" } }
            ]
        }

        const jobs = await Job.find(query)

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log("Err", error);
    }
}

// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId)

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }


        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log("err", error);
    }
}