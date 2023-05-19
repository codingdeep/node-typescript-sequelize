class ResourceNotfoundException extends Error{
    public resource: string;
    public resourceField: string;
    public resourceValue: string;
    public statusCode: number
    constructor(resource:string, resourceField: string, resourceValue: string, statusCode: number) {
        super(`${resource} is not found with this ${resourceField}: ${resourceValue}`);
        this.resource = resource;
        this.resourceValue = resourceValue;
        this.resourceField = resourceField;
        this.statusCode = statusCode;
    }
}

export default ResourceNotfoundException;