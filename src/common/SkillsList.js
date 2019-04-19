import React from "react";
import './SkillsList.css'

function Button(props) {
    if (props.disabled) {
        return (
            <div className="point-box">
                <span>
                    {props.skill.point}
                </span>
            </div>
        );
    }
    return (
        <button className={"point-box " + props.cssClass} value={props.skill.name.name} onClick={props.onClickFn}>
            <span>
                {props.skill.point}
            </span>
        </button>
    );
}

function Skill(props) {
    let cssClass = props.cssClass;
    if (props.skill.isEndorsed) {
        cssClass = cssClass + " endorsed";
    }
   return (
        <div className="skill-individual rounded">
            <span className="skill-text text-center">{props.skill.name.name}</span>
            <Button skill={props.skill} cssClass={cssClass} onClickFn={props.onClickFn} disabled={props.disabled}/>
        </div>
   );
}

function SkillsList(props) {
    const skills = props.skills || [];
    // console.log(skills);
    return (
        <div className="skills">
            {skills.map((skill, i) => (
                <Skill key={i} skill={skill} onClickFn={props.onClickFn} cssClass={props.cssClass} disabled={props.disabled}/>
            ))}
        </div>
    );
}

export default SkillsList;
