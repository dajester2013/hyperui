export default function isPrimitive(v) {
	return v == null || (typeof v !== 'function' && typeof v !== 'object');
}