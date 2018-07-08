//Import a Life from Higher Module
const life=require('life');
//Get a Life For your SELF;
let getALife=new life();
const lifeConfiguration={
    emotions:null,
    relationship:undefined,
    ego:true,
    selfRespect:true,
    goals:[],
    experiences:[]
}
//INITIALIZE YOUR LIFE WITH DEFAUTL CONFIG
getALife.initiate(lifeConfiguration);

while(lifeConfiguration.experiences.length<lifeConfiguration.goals.length){
    if(lifeConfiguration.relationship){
        let tempEmotions=getALife.Experience(lifeConfiguration.relationship)
        if(tempEmotions.isNIRAISHQ){
            lifeConfiguration.ego=false;
            lifeConfiguration.goals.push(tempEmotions.experience)
        }else{
            lifeConfiguration.experiences.push(tempEmotions);
        }
    }else{
        let tempExperience=getALife.Experience(Math.random());
        if(tempExperience.relationship){
            let tempEmotions=getALife.Experience(tempExperience.relationship);
            if(tempEmotions.ego&&lifeConfiguration.selfRespect){
                let NIRAISHQ=await getALife.ExperienceForNIRAISHQ(tempEmotions);
                if(NIRAISHQ){
                    lifeConfiguration.ego=false;
                    lifeConfiguration.goals.push(tempEmotions.experience);
                }else{
                    console.log("IF ITS THERE, I CAN't REMOVE IT. IF IT'S NOT I CAN't Grow IT :) ");
                }
            }else{
                    lifeConfiguration.ego=true;
                    lifeConfiguration.selfRespect=true;
                    lifeConfiguration.experiences.push(tempExperience);
            }
        }else{
            lifeConfiguration.experiences.push(tempExperience);
        }
    }
}