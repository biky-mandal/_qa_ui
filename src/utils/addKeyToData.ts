export const addKeyToData = (data: any) => {

    const returnedData: any = [];

    data.map((d: any) => {
        const obj: any = { ...d };
        obj['key'] = d?._id;
        returnedData.push(obj);
    });

    return returnedData;
}