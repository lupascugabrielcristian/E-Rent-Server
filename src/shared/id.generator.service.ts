export class IdGeneratorService {
	static generate(): number {
		return Math.random() * 1000000;
	}
}
