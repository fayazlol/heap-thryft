//this page should by right show all the objects in our testcollection collection, 
export default async function Page(){
    const fetchTest = async ()=>{
        const res = await fetch("http://localhost:3000/api/testcollection");
        const testcollections = await res.json();
        return testcollections
    };

    const testcollections = await fetchTest();
    const type = typeof testcollections;


    return (
        <div>
            <h1>There should be random values</h1>
            {Array.isArray(testcollections) ? (
                testcollections.map((testcollection: any) => (
                    <div key={testcollection._id}>
                        <h2>{testcollection.name}</h2>
                        <p>{testcollection.description}</p>
                        <p>{testcollection.price}</p>
                    </div>
                ))
            ) : (
                <p>{type}No test collections available</p>
            )}
        </div>
    );
}

