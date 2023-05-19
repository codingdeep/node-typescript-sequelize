class ResourceDuplicateException extends Error {
    public resource: string;
    public resourceField: string;
    public resourceValue: string;
    public statusCode: number

    constructor(resource: string, resourceField: string, resourceValue: string, statusCode: number) {
        super(`${resource} is already exist with this ${resourceField}: ${resourceValue}`);
        this.resource = resource;
        this.resourceField = resourceField;
        this.resourceValue = resourceValue;
        this.statusCode = statusCode;
    }
}

export default ResourceDuplicateException;