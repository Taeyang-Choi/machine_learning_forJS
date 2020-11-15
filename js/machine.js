var Matrix = {
	add: function(a, b) {
		var arr = [];
		if(Array.isArray(a) && Array.isArray(b)) {
			if(this.size(a) != this.size(b)) {
				if(this.size(a) == 1) {
					arr = this.zeros_like(b);
					for(var i=0; i<b.length; i++) 
						for(var j=0; j<b[0].length; j++) 
							arr[i][j] = a[0][0] + b[i][j];
				} else if(this.size(b) == 1) {
					arr = this.zeros_like(a);
					for(var i=0; i<a.length; i++)
						for(var j=0; j<a[0].length; j++)
							arr[i][j] = a[i][j] + b[0][0];
				} else if(a.length == b.length) {
					if(this.size(a) > this.size(b)) { // (r, c) + (r, 1)
					 	if(b[0].length != 1) return;
					 	arr = this.zeros_like(a);
				 		for(var i=0; i<a.length; i++) 
							for(var j=0; j<a[0].length; j++) 
								arr[i][j] = a[i][j] + b[i][0];
					 } else { // (r, 1) + (r, c)
					 	if(a[0].length != 1) return;
					 	arr = this.zeros_like(b);
					 	for(var i=0; i<b.length; i++)
							for(var j=0; j<b[0].length; j++) 
								arr[i][j] = a[i][0] + b[i][j];
					 }
				} else if(a[0].length == b[0].length) {
					 if(this.size(a) > this.size(b)) { // (r, c) + (1, c)
					 	if(b.length != 1) return;
					 	arr = this.zeros_like(a);
				 		for(var i=0; i<a.length; i++) 
							for(var j=0; j<a[0].length; j++) 
								arr[i][j] = a[i][j] + b[0][j];
					 } else { // (1, c) + (r, c)
					 	if(a.length != 1) return;
					 	arr = this.zeros_like(b);
					 	for(var i=0; i<b.length; i++) 
							for(var j=0; j<b[0].length; j++) 
								arr[i][j] = a[0][j] + b[i][j];
					 }

				} else if(!this._isAddable(a, b)) {
					return;
				}
			} else {
				if(!this._isAddable(a, b)) return;
				arr = this.zeros_like(a);
				for(var i=0; i<a.length; i++) {
					for(var j=0; j<a[0].length; j++) {
						arr[i][j] = a[i][j] + b[i][j];
					}
				}
			}
		} else if(Array.isArray(a) || Array.isArray(b)) {
			if(Array.isArray(a)) { // a is array
				arr = this.zeros_like(a);
				for(var i=0; i<a.length; i++) 
					for(var j=0; j<a[0].length; j++) 
						arr[i][j] = a[i][j] + b;
			} else { // b is array
				arr = this.zeros_like(b);
				for(var i=0; i<b.length; i++) 
					for(var j=0; j<b[0].length; j++) 
						arr[i][j] = a + b[i][j];
			}
		} else return;

		return arr;
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

	div: function(a, b) {
		var arr = [];
		if(Array.isArray(a) && Array.isArray(b)) {
			if(this.size(a) != this.size(b)) {
				if(this.size(a) == 1) {
					arr = this.zeros_like(b);
					for(var i=0; i<b.length; i++) 
						for(var j=0; j<b[0].length; j++) 
							arr[i][j] = a[0][0] / b[i][j];
				} else if(this.size(b) == 1) {
					arr = this.zeros_like(a);
					for(var i=0; i<a.length; i++)
						for(var j=0; j<a[0].length; j++)
							arr[i][j] = a[i][j] / b[0][0];
				} else if(a.length == b.length) {
					if(this.size(a) > this.size(b)) { // (r, c) / (r, 1)
					 	if(b[0].length != 1) return;
					 	arr = this.zeros_like(a);
				 		for(var i=0; i<a.length; i++) 
							for(var j=0; j<a[0].length; j++) 
								arr[i][j] = a[i][j] / b[i][0];
					 } else { // (r, 1) / (r, c)
					 	if(a[0].length != 1) return;
					 	arr = this.zeros_like(b);
					 	for(var i=0; i<b.length; i++)
							for(var j=0; j<b[0].length; j++) 
								arr[i][j] = a[i][0] / b[i][j];
					 }
				} else if(a[0].length == b[0].length) {
					 if(this.size(a) > this.size(b)) { // (r, c) / (1, c)
					 	if(b.length != 1) return;
					 	arr = this.zeros_like(a);
				 		for(var i=0; i<a.length; i++) 
							for(var j=0; j<a[0].length; j++) 
								arr[i][j] = a[i][j] / b[0][j];
					 } else { // (1, c) / (r, c)
					 	if(a.length != 1) return;
					 	arr = this.zeros_like(b);
					 	for(var i=0; i<b.length; i++) 
							for(var j=0; j<b[0].length; j++) 
								arr[i][j] = a[0][j] / b[i][j];
					 }
				} else if(!this._isAddable(a, b)) {
					return;
				}
			} else {
				if(!this._isAddable(a, b)) return;
				arr = this.zeros_like(a);
				for(var i=0; i<a.length; i++) {
					for(var j=0; j<a[0].length; j++) {
						arr[i][j] = a[i][j] / b[i][j];
					}
				}
			}
		} else if(Array.isArray(a) || Array.isArray(b)) {
			if(Array.isArray(a)) { // a is array
				arr = this.zeros_like(a);
				for(var i=0; i<a.length; i++) 
					for(var j=0; j<a[0].length; j++) 
						arr[i][j] = a[i][j] / b;
			} else { // b is array
				arr = this.zeros_like(b);
				for(var i=0; i<b.length; i++) 
					for(var j=0; j<b[0].length; j++) 
						arr[i][j] = a / b[i][j];
			}
		} else return;

		return arr;
	},

	dot: function(a, b) {
		if(!this._isDotable(a, b)) return; // avail a*b != avail b*a
		var arr = [];
		for(var i=0; i<a.length; i++) {
			arr.push(new Array());
			for(var j=0; j<b[0].length; j++) {
				for(var k=0; k<b.length; k++) {
					if(k == 0) arr[i].push(0);
					arr[i][j] += a[i][k] * b[k][j];
				}
			}
		}

		return arr;
	},

	exp: function(x) {
		var arr = this.zeros_like(x);
		x.reduce((acc, cur, idx) => {
			for(var i=0; i<cur.length; i++) {
				acc[idx][i] = Math.exp(cur[i]);
			}
			return acc;
		}, arr);

		return arr;
	},

	flatten: function(arr) { return arr.reduce((acc, cur) => acc.concat(cur)); }, 

	log: function(x) {
		var arr = this.zeros_like(x);
		x.reduce((acc, cur, idx) => {
			for(var i=0; i<cur.length; i++) {
				acc[idx][i] = Math.log(cur[i]);
			}
			return acc;
		}, arr);

		return arr;
	},

	log2: function(x) {
		var arr = this.zeros_like(x);
		x.reduce((acc, cur, idx) => {
			for(var i=0; i<cur.length; i++) {
				acc[idx][i] = Math.log2(cur[i]);
			}
			return acc;
		}, arr);

		return arr;
	},

	log10: function(x) {
		var arr = this.zeros_like(x);
		x.reduce((acc, cur, idx) => {
			for(var i=0; i<cur.length; i++) {
				acc[idx][i] = Math.log10(cur[i]);
			}
			return acc;
		}, arr);

		return arr;
	},

	mul: function(a, b) {
		var arr = [];
		if(Array.isArray(a) && Array.isArray(b)) {
			if(this.size(a) != this.size(b)) {
				if(this.size(a) == 1) {
					arr = this.zeros_like(b);
					for(var i=0; i<b.length; i++) 
						for(var j=0; j<b[0].length; j++) 
							arr[i][j] = a[0][0] * b[i][j];
				} else if(this.size(b) == 1) {
					arr = this.zeros_like(a);
					for(var i=0; i<a.length; i++)
						for(var j=0; j<a[0].length; j++)
							arr[i][j] = a[i][j] * b[0][0];
				} else if(a.length == b.length) {
					if(this.size(a) > this.size(b)) { // (r, c) * (r, 1)
					 	if(b[0].length != 1) return;
					 	arr = this.zeros_like(a);
				 		for(var i=0; i<a.length; i++) 
							for(var j=0; j<a[0].length; j++) 
								arr[i][j] = a[i][j] * b[i][0];
					 } else { // (r, 1) * (r, c)
					 	if(a[0].length != 1) return;
					 	arr = this.zeros_like(b);
					 	for(var i=0; i<b.length; i++)
							for(var j=0; j<b[0].length; j++) 
								arr[i][j] = a[i][0] * b[i][j];
					 }
				} else if(a[0].length == b[0].length) {
					 if(this.size(a) > this.size(b)) { // (r, c) * (1, c)
					 	if(b.length != 1) return;
					 	arr = this.zeros_like(a);
				 		for(var i=0; i<a.length; i++) 
							for(var j=0; j<a[0].length; j++) 
								arr[i][j] = a[i][j] * b[0][j];
					 } else { // (1, c) * (r, c)
					 	if(a.length != 1) return;
					 	arr = this.zeros_like(b);
					 	for(var i=0; i<b.length; i++) 
							for(var j=0; j<b[0].length; j++) 
								arr[i][j] = a[0][j] * b[i][j];
					 }
				} else if(!this._isAddable(a, b)) {
					return;
				}
			} else {
				if(!this._isAddable(a, b)) return;
				arr = this.zeros_like(a);
				for(var i=0; i<a.length; i++) {
					for(var j=0; j<a[0].length; j++) {
						arr[i][j] = a[i][j] * b[i][j];
					}
				}
			}
		} else if(Array.isArray(a) || Array.isArray(b)) {
			if(Array.isArray(a)) { // a is array
				arr = this.zeros_like(a);
				for(var i=0; i<a.length; i++) 
					for(var j=0; j<a[0].length; j++) 
						arr[i][j] = a[i][j] * b;
			} else { // b is array
				arr = this.zeros_like(b);
				for(var i=0; i<b.length; i++) 
					for(var j=0; j<b[0].length; j++) 
						arr[i][j] = a * b[i][j];
			}
		} else return;

		return arr;
	},

	pow: function(base, exp) {
		if(!(Array.isArray(base) && !Array.isArray(exp))) return;
		var arr = this.zeros_like(base);
		base.reduce((acc, cur, idx) => {
			for(var i=0; i<cur.length; i++) {
				acc[idx][i] = Math.pow(cur[i], exp);
			}
			return acc;
		}, arr);

		return arr;
	},

	random: {
		np: Matrix,
		rand: function(row, col) {
			var arr = [];
			if(isValid(col)) {
				for(var i=0; i<row*col; i++) 
					arr.push(Math.random());
				return np.reshape(arr, row, col);
			} else {
				for(var i=0; i<row; i++) 
					arr.push(Math.random());
				return np.reshape(arr, 1, row);
			}
		},
	},

	reshape: function(_arr, row, col) {
		var rArr = []; 
		var arr = _arr.slice();
		for(var i=0; i<row; i++) {
			var sArr = arr.splice(0, col);
			rArr.push(sArr);
		}
		return rArr; // 에러처리 추가할것
	},

	shape: function(arr) { return [arr.length, arr[0].length]; },

	size: function(arr) { return arr.length * arr[0].length; },

	sub: function(a, b) {
		var arr = [];
		if(Array.isArray(a) && Array.isArray(b)) {
			if(this.size(a) != this.size(b)) {
				if(this.size(a) == 1) {
					arr = this.zeros_like(b);
					for(var i=0; i<b.length; i++) 
						for(var j=0; j<b[0].length; j++) 
							arr[i][j] = a[0][0] - b[i][j];
				} else if(this.size(b) == 1) {
					arr = this.zeros_like(a);
					for(var i=0; i<a.length; i++)
						for(var j=0; j<a[0].length; j++)
							arr[i][j] = a[i][j] - b[0][0];
				} else if(a.length == b.length) {
					if(this.size(a) > this.size(b)) { // (r, c) + (r, 1)
					 	if(b[0].length != 1) return;
					 	arr = this.zeros_like(a);
				 		for(var i=0; i<a.length; i++) 
							for(var j=0; j<a[0].length; j++) 
								arr[i][j] = a[i][j] - b[i][0];
					 } else { // (r, 1) + (r, c)
					 	if(a[0].length != 1) return;
					 	arr = this.zeros_like(b);
					 	for(var i=0; i<b.length; i++)
							for(var j=0; j<b[0].length; j++) 
								arr[i][j] = a[i][0] - b[i][j];
					 }
				} else if(a[0].length == b[0].length) {
					 if(this.size(a) > this.size(b)) { // (r, c) + (1, c)
					 	if(b.length != 1) return;
					 	arr = this.zeros_like(a);
				 		for(var i=0; i<a.length; i++) 
							for(var j=0; j<a[0].length; j++) 
								arr[i][j] = a[i][j] - b[0][j];
					 } else { // (1, c) + (r, c)
					 	if(a.length != 1) return;
					 	arr = this.zeros_like(b);
					 	for(var i=0; i<b.length; i++) 
							for(var j=0; j<b[0].length; j++) 
								arr[i][j] = a[0][j] - b[i][j];
					 }

				} else if(!this._isAddable(a, b)) {
					return;
				}
			} else {
				if(!this._isAddable(a, b)) return;
				arr = this.zeros_like(a);
				for(var i=0; i<a.length; i++) {
					for(var j=0; j<a[0].length; j++) {
						arr[i][j] = a[i][j] - b[i][j];
					}
				}
			}
		} else if(Array.isArray(a) || Array.isArray(b)) {
			if(Array.isArray(a)) { // a is array
				arr = this.zeros_like(a);
				for(var i=0; i<a.length; i++) 
					for(var j=0; j<a[0].length; j++) 
						arr[i][j] = a[i][j] - b;
			} else { // b is array
				arr = this.zeros_like(b);
				for(var i=0; i<b.length; i++) 
					for(var j=0; j<b[0].length; j++) 
						arr[i][j] = a - b[i][j];
			}
		} else return;

		return arr;
	},

	sum: function(arr) {
		arr = this.flatten(arr);
		return arr.reduce((acc, cur) => acc + cur);
	},

	T: function(x) { // Transposed Matrix
		var arr = this.zeros(x[0].length, x.length);
		for(var i=0; i<x.length; i++) {
			for(j=0; j<x[0].length; j++) {
				arr[j][i] = x[i][j];
			}
		}
		return arr;
	},

	zeros: function(row, col) {
		var arr = [];
		for(var i=0; i<row*col; i++) {
			arr.push(0);
		}

		return this.reshape(arr, row, col);
	},

	zeros_like: function(arr) {
		const row = arr.length;
		const col = arr[0].length;

		return this.zeros(row, col);
	},

	// inner function list
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

	// deprecated function list
	__initWeight: function(row, col) { // deprecated 20201115
		var arr = [];
		for(var i=0; i<row*col; i++) {
			arr.push(Math.random());
		}
		return this.reshape(arr, row, col);
	},
}

var Machine = {
	np: Matrix,
	getYMatrix: function(x, W, b) {
		return np.add(np.dot(x, W), b);
	}, 

	lossFuncMSE: function(W, b, x, t) { // loss function MSE(Mean Squared Error)
		var y = this.getYMatrix(x, W, b); // y = Wx + b;
		return np.sum(np.pow(np.sub(t, y), 2)) / np.size(x); // Sigma(1->n) (t_n - y_n)^2 / n 
	},

	lossFuncCrossEntropy: function(W, b, x, t) {
		var dx = 1e-7;

		const z = this.getYMatrix(x, W, b); // z = Wx + b;
		const y = this.sigmoid(z); // y = 1 / (1+exp^z)

		return -np.sum(np.add(np.mul(t, np.log(np.add(y, dx))), np.mul(np.sub(1, t), np.log(np.add(np.sub(1, y), dx))))); 
	},

	numericalDerivative: function(f, x) { // mnist 부터 매우 느려짐. 1회훈련이 10시간 이상 요구 * 10001
		var dx = 1e-4;	
		if(Array.isArray(x)) {
			var rArr = np.zeros_like(x);
			for(var i=0; i<x.length; i++) {
				for(var j=0; j<x[0].length; j++) {
					var tmp_p = JSON.parse(JSON.stringify(x)); // deep copy
					var tmp_m = JSON.parse(JSON.stringify(x));

					tmp_p[i][j] = tmp_p[i][j] + dx;
					tmp_m[i][j] = tmp_m[i][j] - dx;

					rArr[i][j] = (f(x, tmp_p) - f(x, tmp_m)) / (2 * dx); // f(x+dx) - f(x-dx) / 2dx 행렬별로 실행
				}
			}
			return rArr;
		} else {
			var tmp = x;
			return (f(x, tmp+dx) - f(x, tmp-dx)) / (2*dx);
		}
	},

	sigmoid: function(_data) {
		const data = _data;
		return np.div(1, np.add(1, np.exp(np.mul(data, -1))));  // 1/(1+exp(-x))
	},
}

var Util = {
	getRandomArbitrary: function(min, max) {
  		return Math.random() * (max - min) + min;
	},

	getCSV: function(_data, start, count, max) {
		var data = _data.split("\n");
		var result = [];

		var len = isValid(max) ? max : data.length;
		for(var i=0; i<len; i++) {
			var array = data[i].split(",");

			if(count == "max") {
				for(var j=start; j<array.length; j++) {
					result.push(array[j]);
				}
			} else {
				for(var j=start; j<start+count; j++) {
					result.push(array[j]);
				}
			}
		}
		return result;
	}
}

function LogicGate() {
	LogicGate.prototype.np = Matrix;
	LogicGate.prototype.log = false;
	LogicGate.prototype.init = function(data) {
		this.name = data.name;
		this.__xData = this.np.reshape(data.xdata, 4, 2);
		this.__tData = this.np.reshape(data.tdata, 4, 1);

		this.__W = this.np.random.rand(2, 1);
		this.__b = this.np.random.rand(1);

		this.__lr = 1e-2; // 학습율
		this.__ln = 8001; // 훈련 횟수
		if(isValid(data.log)) this.log = data.log; 
	}

	LogicGate.prototype.errorVal = function() {
		return Machine.lossFuncCrossEntropy(this.__W, this.__b, this.__xData, this.__tData);
	}

	LogicGate.prototype.train = function() {
		var f = (x, dx) => {
			if(this.__W === x) 		return Machine.lossFuncCrossEntropy(dx, this.__b, this.__xData, this.__tData);
			else if(this.__b === x)	return Machine.lossFuncCrossEntropy(this.__W, dx, this.__xData, this.__tData);
		};

		for(var i=0; i<this.__ln; i++) {
			this.__W = this.np.sub(this.__W, this.np.mul(this.__lr, Machine.numericalDerivative(f, this.__W)));
			this.__b = this.np.sub(this.__b, this.np.mul(this.__lr, Machine.numericalDerivative(f, this.__b)));

			// log 요청 선언 obj.log = true 
			if(this.log) if(i % 400 == 0) console.log("cnt="+i+", W: " + this.__W + ", b: " + this.__b + ", error_val: " + Machine.lossFuncCrossEntropy(this.__W, this.__b, this.__xData, this.__tData));
		}
	}

	LogicGate.prototype.predict = function(data) {
		const z = this.np.add(this.np.dot(data, this.__W), this.__b);
		const y = Machine.sigmoid(z);

		console.log("predict: " + y + ", W: " + this.__W + ", b: " + this.__b);
		return y;
	};
}

function XORGate() {
	XORGate.prototype.np = Matrix;
	XORGate.prototype.log = false;
	XORGate.prototype.init = function(data) {
		this.name = data.name;

		this.__xData = this.np.reshape(data.xdata, 4, 2);
		this.__tData = this.np.reshape(data.tdata, 4, 1);

		this.__W2 = this.np.random.rand(2, 6);
		this.__b2 = this.np.random.rand(1, 6);

		this.__W3 = this.np.random.rand(6, 1);
		this.__b3 = this.np.random.rand(1);

		this.__lr = 1e-2; // 학습율
		this.__ln = 10001; // 훈련 횟수
		if(isValid(data.log)) this.log = data.log; 
	}

	XORGate.prototype.feedForward = function(W2, b2, W3, b3) {
		var dx = 1e-7;
		var z2 = this.np.add(this.np.dot(this.__xData, W2), b2);
		var a2 = Machine.sigmoid(z2);

		var z3 = this.np.add(this.np.dot(a2, W3), b3);
		var y = Machine.sigmoid(z3); // a3

		return -this.np.sum(this.np.add(this.np.mul(this.__tData, this.np.log(this.np.add(y, dx))), this.np.mul(this.np.sub(1, this.__tData), this.np.log(this.np.add(this.np.sub(1, y), dx)))));
	}

	XORGate.prototype.train = function() {
		var f = (x, dx) => {
			if(this.__W2 === x) 		return this.feedForward(dx, this.__b2, this.__W3, this.__b3);
			else if(this.__b2 === x)	return this.feedForward(this.__W2, dx, this.__W3, this.__b3);
			else if(this.__W3 === x)	return this.feedForward(this.__W2, this.__b2, dx, this.__b3);
			else if(this.__b3 === x)	return this.feedForward(this.__W2, this.__b2, this.__W3, dx);
		};

		for(var i=0; i<this.__ln; i++) {
			this.__W2 = this.np.sub(this.__W2, this.np.mul(this.__lr, Machine.numericalDerivative(f, this.__W2)));
			this.__b2 = this.np.sub(this.__b2, this.np.mul(this.__lr, Machine.numericalDerivative(f, this.__b2)));
			this.__W3 = this.np.sub(this.__W3, this.np.mul(this.__lr, Machine.numericalDerivative(f, this.__W3)));
			this.__b3 = this.np.sub(this.__b3, this.np.mul(this.__lr, Machine.numericalDerivative(f, this.__b3)));

			// log 요청 선언 obj.log = true 
			if(this.log) if(i % 400 == 0) console.log("cnt="+i+ ", error_val: " + this.feedForward(this.__W2, this.__b2, this.__W3, this.__b3));
		}
	}

	XORGate.prototype.predict = function(data) {
		var z2 = this.np.add(this.np.dot(data, this.__W2), this.__b2);
		var a2 = Machine.sigmoid(z2);

		var z3 = this.np.add(this.np.dot(a2, this.__W3), this.__b3);
		var y = Machine.sigmoid(z3); // a3

		console.log(y);
		return y;
	}
}

function XORGateBackPropagation() { // XOR gate backpropagation ver
	XORGateBackPropagation.prototype.np = Matrix;
	XORGateBackPropagation.prototype.log = false;
	XORGateBackPropagation.prototype.init = function(data) {
		this.name = data.name;

		this.W2 = this.np.random.rand(2, 6);
		this.b2 = this.np.random.rand(1, 6);

		this.W3 = this.np.random.rand(6, 1);
		this.b3 = this.np.random.rand(1);

		this.z3, this.a3, this.z2, this.a2, this.a1 = this.xData;

		this.lr = 1e-2; // 학습율
		this.ln = 10001; // 훈련 횟수
		if(isValid(data.log)) this.log = data.log; 
	}

	XORGateBackPropagation.prototype.feedForward = function(xData, tData) {
		this.a1 = xData;

		this.z2 = this.np.add(this.np.dot(xData, this.W2), this.b2);
		this.a2 = Machine.sigmoid(this.z2);

		this.z3 = this.np.add(this.np.dot(this.a2, this.W3), this.b3);
		this.a3 = Machine.sigmoid(this.z3); // y

		var dx = 1e-7;
		return -this.np.sum(this.np.add(this.np.mul(tData, this.np.log(this.np.add(this.a3, dx))), this.np.mul(this.np.sub(1, tData), this.np.log(this.np.add(this.np.sub(1, this.a3), dx)))));
	}

	XORGateBackPropagation.prototype.train = function(xData, tData) {
		var loss = this.feedForward(xData, tData);
		var loss3 = this.np.mul(this.np.mul(this.np.sub(this.a3, tData), this.a3), this.np.sub(1, this.a3));
		this.W3 = this.np.sub(this.W3, this.np.mul(this.lr, this.np.dot(this.np.T(this.a2), loss3)));
		this.b3 = this.np.sub(this.b3, this.np.mul(this.lr, loss3));

		var loss2 = this.np.mul(this.np.mul(this.np.dot(loss3, this.np.T(this.W3)), this.a2), this.np.sub(1, this.a2));
		this.W2 = this.np.sub(this.W2, this.np.mul(this.lr, this.np.dot(this.np.T(this.a1), loss2)));
		this.b2 = this.np.sub(this.b2, this.np.mul(this.lr, loss2));
	}

	XORGateBackPropagation.prototype.predict = function(data) {
		var z2 = this.np.add(this.np.dot(data, this.W2), this.b2);
		var a2 = Machine.sigmoid(z2);

		var z3 = this.np.add(this.np.dot(a2, this.W3), this.b3);
		var y = Machine.sigmoid(z3); // __a3

		console.log(y);
		return y;
	}
}

function Mnist() {
	Mnist.prototype.np = Matrix;
	Mnist.prototype.log = false;
	Mnist.prototype.tdNums = 1; // 훈련데이터 수
	Mnist.prototype.init = function(data) {
		this.name = data.name;
		// data 0~255 -> 0~1 normalize
		this.__xData = this.np.reshape(data.xdata, this.tdNums, 784);
		for(var i=0; i<this.__xData.length; i++) {
			for(var j=0; j<this.__xData[0].length; j++) {
				this.__xData[i][j] = (this.__xData[i][j] / 255.0 * 0.99) + 0.01;
			}
		}

		this.__tData = this.np.zeros(this.tdNums, 10);
		var temp = this.np.reshape(data.tdata, this.tdNums, 1);
		for(var i=0; i<this.__tData.length; i++) {
			for(var j=0; j<this.__tData[0].length; j++) {
				if(temp[i][0] == j) this.__tData[i][j] = 0.99;
				else this.__tData[i][j] = 0.01;
			}
		}

		this.__W2 = this.np.random.rand(784, 16);
		this.__b2 = this.np.random.rand(1, 16);

		this.__W3 = this.np.random.rand(16, 10);
		this.__b3 = this.np.random.rand(1, 10);

		this.__lr = 1e-4; // 학습율
		this.__ln = 10001; // 훈련 횟수
		if(isValid(data.log)) this.log = data.log; 
	}

	Mnist.prototype.feedForward = function(W2, b2, W3, b3) {
		var dx = 1e-7;
		var z2 = this.np.add(this.np.dot(this.__xData, W2), b2);
		var a2 = Machine.sigmoid(z2);

		var z3 = this.np.add(this.np.dot(a2, W3), b3);
		var y = Machine.sigmoid(z3); // a3

		return -this.np.sum(this.np.add(this.np.mul(this.__tData, this.np.log(this.np.add(y, dx))), this.np.mul(this.np.sub(1, this.__tData), this.np.log(this.np.add(this.np.sub(1, y), dx)))));
	}

	Mnist.prototype.train = function() {
		console.log("train start, log: " + this.log);
		var f = (x, dx) => {
			if(this.__W2 === x) 		return this.feedForward(dx, this.__b2, this.__W3, this.__b3);
			else if(this.__b2 === x)	return this.feedForward(this.__W2, dx, this.__W3, this.__b3);
			else if(this.__W3 === x)	return this.feedForward(this.__W2, this.__b2, dx, this.__b3);
			else if(this.__b3 === x)	return this.feedForward(this.__W2, this.__b2, this.__W3, dx);
		};

		for(var i=0; i<this.__ln; i++) {
			var today = new Date(); console.log("W2 start: " + today.toLocaleTimeString());
			this.__W2 = this.np.sub(this.__W2, this.np.mul(this.__lr, Machine.numericalDerivative(f, this.__W2)));
			today = new Date(); console.log("W2 end b2 start: " + today.toLocaleTimeString());
			this.__b2 = this.np.sub(this.__b2, this.np.mul(this.__lr, Machine.numericalDerivative(f, this.__b2)));
			today = new Date(); console.log("b2 end W3 start: " + today.toLocaleTimeString());
			this.__W3 = this.np.sub(this.__W3, this.np.mul(this.__lr, Machine.numericalDerivative(f, this.__W3)));
			today = new Date(); console.log("W3 end b3 start: " + today.toLocaleTimeString());
			this.__b3 = this.np.sub(this.__b3, this.np.mul(this.__lr, Machine.numericalDerivative(f, this.__b3)));
			today = new Date();
			// log 요청 선언 obj.log = true 
			if(this.log) if(i % 1 == 0) console.log("cnt="+i+ ", error_val: " + this.feedForward(this.__W2, this.__b2, this.__W3, this.__b3) + ", time: " + today.toLocaleTimeString());
		}
	}
}


var AJAX = {
	call: function (url, params, onSuccess, progShow, progMsg) {
		if (progShow) Dialog.showProgress(progMsg);
		
		var callobj = {};
		callobj["url"] = url;
		callobj["type"] = "GET";
		callobj["data"] = params;
		callobj["cache"] = false;
		callobj["dataType"] = "text";
		callobj["success"] = onSuccess; 
		callobj["error"] = function (xhr, status, error) {
			if (xhr.status == 0) {
			    Dialog.alert("네트워크 접속이 원할하지 않습니다.");
			}
			else {
				var str = "code:" + xhr.status + "\n" + "message:" + xhr.responseText + "\n" + "error:" + error;
				console.log(str);
			}
		};
		if (progShow) {
			callobj["complete"] = function () { Dialog.hideProgress(); };
		}
		
		jQuery.ajax(callobj);
	},
}

function isValid(param) {
	return (param != null && param != "" && typeof param != "undefined");
}