import { Semesters } from "../../../../semester-enum"

const STUDENTS: { name: string; semester: Semesters }[] = [
    {
        name: 'Jonas',
        semester: Semesters["1° Termo"]
    },
    {
        name: 'Rafael',
        semester: Semesters["2° Termo"]
    },
    {
        name: 'Reginaldo',
        semester: Semesters["3° Termo"]
    },
    {
        name: 'Carla',
        semester: Semesters["4° Termo"]
    },
]

async function mockFetchStudents() {
    return new Promise<typeof STUDENTS>((resolve) => {
        resolve(STUDENTS)
    })
}

export async function load() {
    console.log("oie")
    return {
        students: await mockFetchStudents()
    }
}