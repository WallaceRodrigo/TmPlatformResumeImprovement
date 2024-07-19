import axios from "axios";

const LlmServiceUrl = 'http://35.229.116.111';
const AccountUrl = 'http://34.139.9.188';

export const GetResume = async (externalId: string) => {
    const response = await axios.get(`${AccountUrl}/api/getResumeForAccount/${externalId}`,);

    return response.data;
};

export const ResumeParse = async (resume: FormData, externalId: string) => {
    try {
        const response = await axios.post(`${LlmServiceUrl}/linkedin/${externalId}/parse`, resume, {
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
        const response = await axios.post(`${LlmServiceUrl}/linkedin/improve`, resume);

        return response.data;
    } catch (error) {
        console.error("Erro ao melhorar currículo", error);

        throw error;
    }
}

export const ChatGptImproveAboutMe = async (aboutMe: string) => {
    try {
      const response = await axios.post(`${LlmServiceUrl}/improveResume/aboutMe`,  aboutMe, {
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
      const response = await axios.post(`${LlmServiceUrl}/improveResume/achievements`,  achievement, {
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
      const response = await axios.post(`${LlmServiceUrl}/improveResume/context`,  context, {
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