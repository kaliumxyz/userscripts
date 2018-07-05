const K = {};
K.regexp = new RegExp('s(?=\\S)', 'gi');
K.filter = msg => msg.replace(K.regexp,'ſ');
Instant.input._post = Instant.input.post;
Instant.input.post = post => Instant.input._post(K.filter(post));
