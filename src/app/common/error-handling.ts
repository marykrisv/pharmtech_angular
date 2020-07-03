export class ErrorHandling {
    
    showError(errorCode, message): string {
        switch(errorCode) {
            case "01": return "No item found in database.";
            case "02": return "Error in Exception: "+message;
            case "03": return "No item created/affected in database.";
            case "04": return "Error in PDOException: "+message;
            case "05": return "Item already exists in database.";
        }
    }
}