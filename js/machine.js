var Machine = {
	getYMatrix: function(x, W, b) {
		return Matrix.add(Matrix.dot(x, W), b);
		
	}
}

var Calculus = {
	numericalDerivative: function(f, x) {
		var dx = 1e-4;	
		var tmp;
		if(Array.isArray(x)) {
			tmp = x.slice();
			return (f(x, Matrix.add(tmp, dx)) - f(x, Matrix.sub(tmp, dx))) / (2 * dx)
		} else {
			tmp = x;
			return (f(x, tmp+dx) - f(x, tmp-dx)) / (2*dx);
		}
	},
}

var Matrix = {
	add: function(a, b) {
		var rArr = [];
		if(Array.isArray(a) && Array.isArray(b)) {
			if(!this._isAddable(a, b)) return;
			for(var i=0; i<a.length; i++) {
					rArr.push(new Array());
					for(var j=0; j<a[0].length; j++) {
						if(j == 0) rArr[i].push(0);
						rArr[i][j] = a[i][j] + b[i][j];
					}
				}
		} else if(Array.isArray(a) || Array.isArray(b)) {
			if(Array.isArray(a)) { // a is array
				for(var i=0; i<a.length; i++) {
					rArr.push(new Array());
					for(var j=0; j<a[0].length; j++) {
						if(j == 0) rArr[i].push(0);
						rArr[i][j] = a[i][j] + b;
					}
				}
			} else { // b is array
				for(var i=0; i<b.length; i++) {
					rArr.push(new Array());
					for(var j=0; j<b[0].length; j++) {
						if(j == 0) rArr[i].push(0);
						rArr[i][j] = b[i][j] + a;
					}
				}
			}
		} else return;

		return rArr;
	},

	array_equal: function(a, b) {
		if(!(Array.isArray(a) && Array.isArray(b))) return;
		if(this._isAddable(a, b)) {
			for(var i=0; i<a.length; i++) {
				for(var j=0; j<a[0].length; j++) {
					if(a[i][j] != b[i][j]) return false;
				}
			}
			return true;
		}
	},

	dot: function(a, b) {
		if(!this._isDotable(a, b)) return;
		var rArr = [];

		for(var i=0; i<a.length; i++) {
			rArr.push(new Array());
			for(var j=0; j<b[0].length; j++) {
				for(var k=0; k<b.length; k++) {
					if(k == 0) rArr[i].push(0);
					rArr[i][j] += a[i][k] * b[k][j];
				}
			}
		}

		return rArr;

	}, 

	_isAddable: function(_a, _b) {
		var a = this.shape(_a);
		var b = this.shape(_b);
		if((a[0] == b[0]) && (a[1] == b[1])) return true;
		else return false;
	},

	_isDotable: function(_a, _b) {
		var a = this.shape(_a);
		var b = this.shape(_b);
		if(a[1] == b[0]) return true;
		else return false;
	},

	pow: function(base, exp) {
		var rArr = [];

		if(!(Array.isArray(base) && !Array.isArray(exp))) return;
		for(var i=0; i<base.length; i++) {
			rArr.push(new Array());
			for(var j=0; j<base[0].length; j++) {
				if(j == 0) rArr[i].push(0);
				rArr[i][j] = Math.pow(base[i][j], exp);
			}
		}



		return rArr;
	},

	reshape: function(_arr, row, col) {
		var rArr = []; 
		var arr = _arr.slice(); // temp arr
		for(var i=0; i<row; i++) {
			var sArr = arr.splice(0, col);
			rArr.push(sArr);
		}
		return rArr; // 에러처리 추가할것
	},

	shape: function(arr) {
		return [arr.length, arr[0].length];
	},

	size: function(arr) {
		return arr.length * arr[0].length; // 행렬 요소 갯수
	},

	sub: function(a, b) {
		var rArr = [];
		if(Array.isArray(a) && Array.isArray(b)) {
			if(!this._isAddable(a, b)) return;
			for(var i=0; i<a.length; i++) {
					rArr.push(new Array());
					for(var j=0; j<a[0].length; j++) {
						if(j == 0) rArr[i].push(0);
						rArr[i][j] = a[i][j] - b[i][j];
					}
				}
		} else if(Array.isArray(a) || Array.isArray(b)) {
			if(Array.isArray(a)) { // a is array
				for(var i=0; i<a.length; i++) {
					rArr.push(new Array());
					for(var j=0; j<a[0].length; j++) {
						if(j == 0) rArr[i].push(0);
						rArr[i][j] = a[i][j] - b;
					}
				}
			} else { // b is array
				for(var i=0; i<b.length; i++) {
					rArr.push(new Array());
					for(var j=0; j<b[0].length; j++) {
						if(j == 0) rArr[i].push(0);
						rArr[i][j] = b[i][j] - a;
					}
				}
			}
		} else return;

		return rArr;
	},

	sum: function(arr) {
		var sum = 0;
		for(var i=0; i<arr.length; i++) {
			for(var j=0; j<arr[0].length; j++) {
				sum += arr[i][j];
			}
		}

		return sum;
	},
}

var Util = {
	getRandomArbitrary: function(min, max) {
  		return Math.random() * (max - min) + min;
	}
}