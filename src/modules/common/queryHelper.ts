class QueryHelper {
    private model: any;

    constructor(model: any) {
        this.model = model
    }

    public baseQuery = () => {
        return {
            where: {} as any,
            include: []
        }
    }
    public exists = async (query: any): Promise<boolean> => {
        const queryResult = await this.model.findOne(query);
        return !!queryResult === true;

    }
}

export default QueryHelper