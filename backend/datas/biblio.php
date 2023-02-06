 <?php
function pointForReaction($reaction) {
	switch ($reaction) {
		case 'heart':
			return 20;
			break;
		case 'laughing':
			return 15;
			break;
		case 'impressed':
			return 10;
			break;
		case 'like':
			return 5;
			break;
		case 'handshake':
			return 0;
			break;
		case 'sad':
			return -5;
			break;
		case 'sick':
			return -10;
			break;
		case 'angry':
			return -20;
			break;
		
		default:
			# code...
			break;
	}
}
?>