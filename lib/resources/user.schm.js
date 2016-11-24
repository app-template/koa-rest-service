const schema = module.exports = {
	create : {
		body : {
	        type:'object',
	        properties : {
	            username: {type : 'string'},
	            passwd: {type: 'string'}
	        },
	        required : ['username','passwd']
    		},
    		result : {
    			type: 'object',
    			properties : {
		            username: {type : 'string'}
		      },
		      required : ['username']
    		}
	},
	update : {
		body : {
			type: 'object',
			properties : {
				passwd : {type: 'string'}
			},
			required: ['passwd']
		}
	}
};