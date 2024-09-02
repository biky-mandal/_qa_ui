export const addKeyToData = (data: any) => {

    const returnedData: any = [];

    data.map((user: any) => {
        const obj: any = { ...user };
        obj['key'] = user?._id;
        returnedData.push(obj);
    });

    return returnedData;
}