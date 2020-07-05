export class ErrorHandling {
    
    static showError(response): string {
        var errorCode = response['errorCode'];
        var message = response['message'];

        switch(errorCode) {
            case 1: 
            case "01": 
                return "No item found in database.";
            case 2: 
            case "02": 
                return "Error in Exception: "+message;
            case 3: 
            case "03": 
                return "No item created/affected in database.";
            case 4: 
            case "04": 
                return "Error in PDOException: "+message;
            case 5:
            case "05": 
                return message;
            default: return "Error occured in the database";
        }
    }
}