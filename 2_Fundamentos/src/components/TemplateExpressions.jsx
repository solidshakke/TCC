const TemplateExpressions = () => {
    const name = "Leandro";
    const data = {
        age: 32,
        job: "Programmer",
    };

    return (
        <div>
            <h1>Olá {name}, tudo bem? </h1>
            <p>Vocês atua como: {data.job}</p>
            <p>{4 + 4}</p>
            <p>{console.log("JSX React")}</p>
        </div>
    );
};

export default TemplateExpressions