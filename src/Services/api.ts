import axios from "axios";

const API_URL = 'http://localhost:5014';

export const GetResume = async (externalId: string) => {
    const response = await axios.get(`http://localhost:5206/api/getResumeForAccount/${externalId}`,);

    return response.data;
};

export const ResumeParse = async (resume: FormData, externalId: string) => {
    try {
        const response = await axios.post(`${API_URL}/linkedin/${externalId}/parse`, resume, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao enviar currículo", error);

        throw error;
    }
};

export const ImproveResme = async (resume: any) => {
    try {
        const response = await axios.post(`${API_URL}/linkedin/improve`, resume);

        return response.data;
    } catch (error) {
        console.error("Erro ao melhorar currículo", error);

        throw error;
    }
}

export const ChatGptImproveAboutMe = async (aboutMe: string) => {
    try {
      const response = await axios.post(`${API_URL}/improveResume/aboutMe`,  aboutMe, {
        headers: {
          'Content-Type': 'application/json'
        }
    });
  
      return response.data;
    } catch (error) {
      console.error("Erro ao melhorar about me", error);
  
      throw error;
    }
  }

  export const ChatGptImproveAchievement = async (achievement: string) => {
    try {
      const response = await axios.post(`${API_URL}/improveResume/achievements`,  achievement, {
        headers: {
          'Content-Type': 'application/json'
        }
    });
  
      return response.data;
    } catch (error) {
      console.error("Erro ao melhorar o achievement", error);
  
      throw error;
    }
  }

  export const ChatGptImproveContext = async (context: string) => {
    try {
      const response = await axios.post(`${API_URL}/improveResume/context`,  context, {
        headers: {
          'Content-Type': 'application/json'
        }
    });
  
      return response.data;
    } catch (error) {
      console.error("Erro ao melhorar o context", error);
  
      throw error;
    }
  }