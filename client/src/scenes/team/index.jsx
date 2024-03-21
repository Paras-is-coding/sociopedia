import React from "react";
import TeamCard from "../../components/teamcard";
import paras from "../../assets/images/team/paras.jpeg";
import bimla from "../../assets/images/team/bimla.jpeg";
import pusp from "../../assets/images/team/pusp.png";
import ramila from "../../assets/images/team/ramila.png";
import rukmani from "../../assets/images/team/rukmani.png";

const Team = () => {
  
  const teamMembers = [
    { name: "Paras Chand", profession: "Web Developer", imageSrc: paras },
    { name: "Bimla Bhatt", profession: "UI/UX Designer", imageSrc: bimla },
    { name: "Rukmani Uranw", profession: "UI/UX Designer", imageSrc: rukmani },
    { name: "Ramila Bist", profession: "Report maker", imageSrc: ramila },
    { name: "Pusp Joshi", profession: "Brand Ambassador", imageSrc: pusp }
  ];

  return (
    <section className="pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[50px] ">
      <div className="container mx-auto ">
        <div className="mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Our Team
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-customDark dark:text-white sm:text-4xl md:text-[40px]">
                Our Awesome Team
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                "Meet our talented team: a diverse group of experts
                collaborating to innovate and deliver exceptional experiences."
              </p>
            </div>
          </div>
        </div>

        <div className=" flex gap-1 flex-wrap justify-center">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              profession={member.profession}
              imageSrc={member.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
