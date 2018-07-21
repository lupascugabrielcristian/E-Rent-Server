import { IdGeneratorService } from '../shared/id.generator.service';
import { Command } from '../model/command'; 

export class CommandBuilder {
	
	constructor(private idGenerator: IdGeneratorService){}

	getCommand(): Command {
		return new Command('itemid', 'startDate');
	}
}
