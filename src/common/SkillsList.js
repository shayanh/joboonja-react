import React from "react";
import './SkillsList.css'

function Skill(props) {
   return (
        <div className="skill-individual rounded">
            <span className="skill-text text-center">{props.skill.name.name}</span>
            <button className={"point-box " + props.cssClass} value={props.skill.name.name} onClick={props.onClickFn}><span>{props.skill.point}</span></button>
        </div>
   );
}

function SkillsList(props) {
    const skills = props.skills || [];
    console.log(skills);
    return (
        <div className="col-md-12">
            <div className="skills">
                {skills.map((skill, i) => (
                    <Skill key={i} skill={skill} onClickFn={props.onClickFn} cssClass={props.cssClass}/>
                ))}
            </div>
        </div>
    );
}

export default SkillsList;
