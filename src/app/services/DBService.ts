import { Observable } from "rxjs";

abstract class DBService {
    abstract getAll(): Observable<any>;
}