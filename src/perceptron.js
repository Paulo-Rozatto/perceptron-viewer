function innerProduct(v1, v2) {
    let sum = 0;
    for (let i = 0; i < v1.length; i++) {
        sum += v1[i] * v2[i];
    }
    return sum;
}

function activation(x) {
    // threshold activation function
    return x >= 0 ? 1 : 0;
}


function trainStep(inputs, labels, weights, bias, learnRate) {
    for (let i = 0; i < inputs.length; i++) {
        const prediction = activation(
            innerProduct(inputs[i], weights) + bias
        );

        if (prediction[i] === labels[i]) {
            continue;
        }

        const alpha = (labels[i] - prediction) * learnRate;
        bias += alpha;

        for (let j = 0; j < inputs[i].length; j++) {
            weights[j] += alpha * inputs[i][j];
        }
    }

    return bias;
}

export function train(inputs, labels, weights, bias, learnRate, epochs) {
    for (let i = 0; i < epochs; i++) {
        bias = trainStep(inputs, labels, weights, bias, learnRate);
    }
    return bias;
}