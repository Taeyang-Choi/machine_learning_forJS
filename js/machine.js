var Matrix = {
	add: function(a, b) {
		var rArr = [];
		if(Array.isArray(a) && Array.isArray(b)) {
			if(this.size(a) != this.size(b)) {
				if(this.size(a) == 1) {
					for(var i=0; i<b.length; i++) {
						rArr.push(new Array());
						for(var j=0; j<b[0].length; j++) {
							if(j == 0) rArr[i].push(0);
							rArr[i][j] = a[0][0] + b[i][j];
						}
					}
				} else if(this.size(b) == 1) {
					for(var i=0; i<a.length; i++) {
						rArr.push(new Array());
						for(var j=0; j<a[0].length; j++) {
							if(j == 0) rArr[i].push(0);
							rArr[i][j] = a[i][j] + b[0][0];
						}
					}
				} else if(a.length == b.length) { // (a * b) + (a, 1)
					if(this.size(a) > this.size(b)) { // (a*b) + (1, b)
					 	if(b[0].length != 1) return;
				 		for(var i=0; i<a.length; i++) {
							rArr.push(new Array());
							for(var j=0; j<a[0].length; j++) {
								if(j == 0) rArr[i].push(0);
								rArr[i][j] = a[i][j] + b[i][0];
							}
						}
					 } else { // (1, b) + (a*b)
					 	if(a[0].length != 1) return;
					 	for(var i=0; i<a.length; i++) {
							rArr.push(new Array());
							for(var j=0; j<a[0].length; j++) {
								if(j == 0) rArr[i].push(0);
								rArr[i][j] = a[i][0] + b[i][j];
							}
						}
					 }
				} else if(a[0].length == b[0].length) {
					 if(this.size(a) > this.size(b)) { // (a*b) + (1, b)
					 	if(b.length != 1) return;
				 		for(var i=0; i<a.length; i++) {
							rArr.push(new Array());
							for(var j=0; j<a[0].length; j++) {
								if(j == 0) rArr[i].push(0);
								rArr[i][j] = a[i][j] + b[0][j];
							}
						}
					 } else { // (1, b) + (a*b)
					 	if(a.length != 1) return;
					 	for(var i=0; i<a.length; i++) {
							rArr.push(new Array());
							for(var j=0; j<a[0].length; j++) {
								if(j == 0) rArr[i].push(0);
								rArr[i][j] = a[0][j] + b[i][j];
							}
						}
					 }

				} else if(!this._isAddable(a, b)) {
					return;
				}
			} else {
				if(!this._isAddable(a, b)) return;
				for(var i=0; i<a.length; i++) {
					rArr.push(new Array());
					for(var j=0; j<a[0].length; j++) {
						if(j == 0) rArr[i].push(0);
						rArr[i][j] = a[i][j] + b[i][j];
					}
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
						rArr[i][j] = a + b[i][j];
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

	div: function(a, b) {
		var rArr = [];
		if(Array.isArray(a) && Array.isArray(b)) {
			if(!this._isAddable(a, b)) return;
			for(var i=0; i<a.length; i++) {
					rArr.push(new Array());
					for(var j=0; j<a[0].length; j++) {
						if(j == 0) rArr[i].push(0);
						rArr[i][j] = a[i][j] / b[i][j];
					}
				}
		} else if(Array.isArray(a) || Array.isArray(b)) {
			if(Array.isArray(a)) { // a is array
				for(var i=0; i<a.length; i++) {
					rArr.push(new Array());
					for(var j=0; j<a[0].length; j++) {
						if(j == 0) rArr[i].push(0);
						rArr[i][j] = a[i][j] / b;
					}
				}
			} else { // b is array
				for(var i=0; i<b.length; i++) {
					rArr.push(new Array());
					for(var j=0; j<b[0].length; j++) {
						if(j == 0) rArr[i].push(0);
						rArr[i][j] = a / b[i][j];
					}
				}
			}
		} else return;

		return rArr;
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

	exp: function(x) {
		var rArr = [];

		for(var i=0; i<x.length; i++) {
			rArr.push(new Array());
			for(var j=0; j<x[0].length; j++) {
				if(j == 0) rArr[i].push(0);
				rArr[i][j] = Math.exp(x[i][j]); 
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

	initWeight: function(row, col) {
		var result = [];
		for(var i=0; i<row*col; i++) {
			result.push(Math.random());
		}

		return this.reshape(result, row, col);
	},

	log: function(x) {
		var rArr = [];

		for(var i=0; i<x.length; i++) {
			rArr.push(new Array());
			for(var j=0; j<x[0].length; j++) {
				if(j == 0) rArr[i].push(0);
				rArr[i][j] = Math.log(x[i][j]); 
			}
		}

		return rArr;
	},

	log2: function(x) {
		var rArr = [];

		for(var i=0; i<x.length; i++) {
			rArr.push(new Array());
			for(var j=0; j<x[0].length; j++) {
				if(j == 0) rArr[i].push(0);
				rArr[i][j] = Math.log2(x[i][j]); 
			}
		}

		return rArr;
	},

	log10: function(x) {
		var rArr = [];

		for(var i=0; i<x.length; i++) {
			rArr.push(new Array());
			for(var j=0; j<x[0].length; j++) {
				if(j == 0) rArr[i].push(0);
				rArr[i][j] = Math.log10(x[i][j]); 
			}
		}

		return rArr;
	},

	mul: function(a, b) {
		var rArr = [];
		if(Array.isArray(a) && Array.isArray(b)) {
			if(!this._isAddable(a, b)) return;
			for(var i=0; i<a.length; i++) {
					rArr.push(new Array());
					for(var j=0; j<a[0].length; j++) {
						if(j == 0) rArr[i].push(0);
						rArr[i][j] = a[i][j] * b[i][j];
					}
				}
		} else if(Array.isArray(a) || Array.isArray(b)) {
			if(Array.isArray(a)) { // a is array
				for(var i=0; i<a.length; i++) {
					rArr.push(new Array());
					for(var j=0; j<a[0].length; j++) {
						if(j == 0) rArr[i].push(0);
						rArr[i][j] = a[i][j] * b;
					}
				}
			} else { // b is array
				for(var i=0; i<b.length; i++) {
					rArr.push(new Array());
					for(var j=0; j<b[0].length; j++) {
						if(j == 0) rArr[i].push(0);
						rArr[i][j] = a * b[i][j];
					}
				}
			}
		} else return;

		return rArr;
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
						rArr[i][j] = a - b[i][j];
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

var Machine = {
	np: Matrix,
	getYMatrix: function(x, W, b) {
		return this.np.add(this.np.dot(x, W), b);
	}, 

	lossFuncMSE: function(W, b, x, t) { // loss function MSE(Mean Squared Error)
		var y = this.getYMatrix(x, W, b); // y = Wx + b;
		return this.np.sum(this.np.pow(this.np.sub(t, y), 2)) / this.np.size(x); // Sigma(1->n) (t_n - y_n)^2 / n 
	},

	lossFuncCrossEntropy: function(W, b, x, t) {
		var dx = 1e-7;

		const z = this.getYMatrix(x, W, b); // z = Wx + b;
		const y = this.sigmoid(z); // y = 1 / (1+exp^z)

		return -this.np.sum(this.np.add(this.np.mul(t, this.np.log(this.np.add(y, dx))), this.np.mul(this.np.sub(1, t), this.np.log(this.np.add(this.np.sub(1, y), dx))))); 
	},

	sigmoid: function(_data) {
		const data = _data;
		return this.np.div(1, this.np.add(1, this.np.exp(this.np.mul(data, -1))));  // 1/(1+exp(-x))
	},
}

var Calculus = {
	numericalDerivative: function(f, x) {
		var dx = 1e-4;	
		if(Array.isArray(x)) {
			var rArr = [];

			for(var i=0; i<x.length; i++) {
				rArr.push(new Array());
				for(var j=0; j<x[0].length; j++) {
					if(j == 0) rArr[i].push(0);
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
}



var Util = {
	getRandomArbitrary: function(min, max) {
  		return Math.random() * (max - min) + min;
	},

	getCSV: function(_data, start, count) {
		var data = _data.split("\n");
		var result = [];
		data.forEach(function(d) {
			var array = d.split(",");
			for(var i=start; i<start+count; i++) {
				result.push(array[i]);
			}
		})

		return result;
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

function LogicGate() {
	LogicGate.prototype.np = Matrix;
	LogicGate.prototype.log = false;
	LogicGate.prototype.init = function(data) {
		this.name = data.name;
		this.__xData = this.np.reshape(data.xdata, 4, 2);
		this.__tData = this.np.reshape(data.tdata, 4, 1);

		this.__W = this.np.initWeight(2, 1);
		this.__b = this.np.initWeight(1, 1);

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
			this.__W = this.np.sub(this.__W, this.np.mul(this.__lr, Calculus.numericalDerivative(f, this.__W)));
			this.__b = this.np.sub(this.__b, this.np.mul(this.__lr, Calculus.numericalDerivative(f, this.__b)));

			// log 요청 선언 obj.log = true 
			if(this.log) if(i % 400 == 0) console.log("cnt="+i+", W: " + this.__W + ", b: " + this.__b + ", error_val: " + Machine.lossFuncCrossEntropy(this.__W, this.__b, this.__xData, this.__tData));
		}
	}

	LogicGate.prototype.predict = function(data) {
		const z = this.np.add(this.np.dot(data, this.__W), this.__b);
		const y = Machine.sigmoid(z);

		console.log(y);
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

		this.__W2 = this.np.initWeight(2, 6);
		this.__b2 = this.np.initWeight(1, 6);

		this.__W3 = this.np.initWeight(6, 1);
		this.__b3 = this.np.initWeight(1, 1);

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
			this.__W2 = this.np.sub(this.__W2, this.np.mul(this.__lr, Calculus.numericalDerivative(f, this.__W2)));
			this.__b2 = this.np.sub(this.__b2, this.np.mul(this.__lr, Calculus.numericalDerivative(f, this.__b2)));
			this.__W3 = this.np.sub(this.__W3, this.np.mul(this.__lr, Calculus.numericalDerivative(f, this.__W3)));
			this.__b3 = this.np.sub(this.__b3, this.np.mul(this.__lr, Calculus.numericalDerivative(f, this.__b3)));

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


function isValid(param) {
	return (param != null && param != "" && typeof param != "undefined");
}